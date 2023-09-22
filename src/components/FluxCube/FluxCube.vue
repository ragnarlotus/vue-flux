<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import useComponent from '../component';
	import { Props, Turn } from './types';
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
			transformOrigin: `center center -${props.depth / 2}px`,
		},
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const sideTransformCreator = new SideTransformCreator(
		props.depth,
		props.size,
		props.viewSize
	);

	const sides = computed(() =>
		CubeCreator.getSidesProps(
			sideTransformCreator,
			props.colors,
			props.rscs,
			props.offsets
		)
	);

	const turn = (turn: Turn) =>
		transform({ transform: sideTransformCreator.getRotate(turn) });

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
