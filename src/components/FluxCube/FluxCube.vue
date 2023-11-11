<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import useComponent from '../useComponent';
	import { FluxCubeProps, Turn } from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../types';
	import SideTransformFactory from './factories/SideTransformFactory';
	import CubeFactory from './factories/CubeFactory';

	const props = withDefaults(defineProps<FluxCubeProps>(), {
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
			transformOrigin:
				props.origin !== undefined
					? props.origin
					: `center center -${props.depth / 2}px`,
		},
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const sideTransformFactory = computed(
		() => new SideTransformFactory(props.depth, props.size, props.viewSize)
	);

	const sides = computed(() =>
		CubeFactory.getSidesProps(
			sideTransformFactory.value,
			props.colors,
			props.rscs,
			props.offsets,
			props.offset
		)
	);

	const turn = (turn: Turn) =>
		transform({ transform: sideTransformFactory.value.getRotate(turn) });

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
