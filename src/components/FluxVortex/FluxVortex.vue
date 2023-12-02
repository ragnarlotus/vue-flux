<script setup lang="ts">
	import { ref, reactive, computed, Ref, onBeforeUpdate } from 'vue';
	import { round, ceil, diag } from '../../shared/Maths';
	import useComponent from '../useComponent';
	import { Position } from '../../shared';
	import { ComponentStyles } from '../types';
	import { FluxVortexProps } from './types';

	const props = withDefaults(defineProps<FluxVortexProps>(), {
		circles: 1,
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			position: 'relative',
			overflow: 'hidden',
		},
	});

	const { style, setCss, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const numCircles = computed(() => round(props.circles));

	const diagonal = computed(() =>
		diag(props.size.toValue() as { width: number; height: number })
	);

	const radius = computed(() => ceil(diagonal.value / 2 / numCircles.value));

	const topGap = computed(() =>
		ceil(props.size.height.value! / 2 - radius.value * numCircles.value)
	);

	const leftGap = computed(() =>
		ceil(props.size.width.value! / 2 - radius.value * numCircles.value)
	);

	const tiles = computed(() => {
		const tiles = [];

		for (let i = 0; i < numCircles.value; i++) {
			const size = (numCircles.value - i) * radius.value * 2;
			const gap = radius.value * i;

			const tile: any = {
				offset: new Position({
					top: topGap.value + gap,
					left: leftGap.value + gap,
				}),
			};

			tile.css = {
				...props.tileCss,
				position: 'absolute',
				...tile.offset.toPx(),
				width: size + 'px',
				height: size + 'px',
				backgroundRepeat: 'repeat',
				borderRadius: '50%',
				zIndex: i,
			};

			tiles.push(tile);
		}

		return tiles;
	});

	const $tiles: Ref<any[]> = ref([]);

	onBeforeUpdate(() => {
		$tiles.value = [];
	});

	const transform = (func: Function) => {
		$tiles.value.forEach((tile: any, index: number) => func(tile, index));
	};

	defineExpose({
		setCss,
		transform,
		show,
		hide,
	});
</script>

<template>
	<div ref="$el" class="flux-vortex" :style="style">
		<component
			:is="rsc.transition.component"
			v-for="(tile, index) in tiles"
			:ref="
				(el: any) => {
					if (el) $tiles[index] = el;
				}
			"
			:key="index"
			:size="size"
			:rsc="rsc"
			:offset="tile.offset"
			:css="tile.css"
		/>
	</div>
</template>
