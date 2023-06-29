<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import useComponent from '../component';
	import { Props, Side, Sides, Turn } from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../../types';
	import SideTransformCreator from './SideTransformCreator';
	import CubeCreator from './CubeCreator';

	const props = withDefaults(defineProps<Props>(), {
		rscs: () => ({}),
		colors: () => ({}),
		offsets: () => ({}),
		depth: 0,
		viewSize: () => new Size(),
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			transformStyle: 'preserve-3d',
		},
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const definedSides = computed<Side[]>(() =>
		Object.values(Sides).filter((side) => isSideDefined(side))
	);

	function isSideDefined(side: Side) {
		if (props.rscs[side] !== undefined) {
			return true;
		}

		if (props.colors[side] !== undefined) {
			return true;
		}

		return false;
	}

	const sideTransformCreator = new SideTransformCreator(
		props.depth,
		props.size,
		props.viewSize
	);

	const sides = computed(() => {
		const cubeCreator = new CubeCreator(
			definedSides.value,
			props.colors,
			props.rscs,
			props.offsets
		);

		return cubeCreator.getSidesProps(sideTransformCreator);
	});

	const turn = (turn: Turn) =>
		transform({ transform: sideTransformCreator.getSideCss(turn) });

	defineExpose({
		setCss,
		transform,
		show,
		hide,
		turn,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<component
			:is="side!.component"
			v-for="side in sides"
			:key="side!.name"
			v-bind="side"
		/>
	</div>
</template>
