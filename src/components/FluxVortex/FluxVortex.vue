<script setup lang="ts">
	import {
		ref,
		reactive,
		computed,
		Ref,
		onBeforeUpdate,
		type Component,
	} from 'vue';
	import useComponent from '../useComponent';
	import { ComponentStyles } from '../types';
	import { FluxVortexProps } from './types';
	import { VortexFactory } from './factories';

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

	const tiles = computed(() => VortexFactory.getCirclesProps(props));

	const $tiles: Ref<Component[]> = ref([]);

	onBeforeUpdate(() => {
		$tiles.value = [];
	});

	const transform = (cb: Function) => {
		$tiles.value.forEach((tile: Component, index: number) => cb(tile, index));
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
			:ref="(el: Component) => $tiles.push(el)"
			:key="index"
			:size="size"
			:rsc="rsc"
			:offset="tile.offset"
			:css="tile.css"
		/>
	</div>
</template>
