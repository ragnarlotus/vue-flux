<script setup lang="ts">
	import { ref, reactive, computed, onBeforeUpdate } from 'vue';
	import useComponent from '../useComponent';
	import { FluxCubeProps, SidesComponents, Turn } from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../types';
	import SideTransformFactory from './factories/SideTransformFactory';
	import CubeFactory from './factories/CubeFactory';
	import Sides from './Sides';

	const props = withDefaults(defineProps<FluxCubeProps>(), {
		rscs: () => ({}),
		colors: () => ({}),
		offsets: () => ({}),
		depth: 0,
		viewSize: () => new Size(),
	});

	const $el = ref(null);

	const transformOrigin = computed(() =>
		props.origin !== undefined
			? props.origin
			: `center center -${props.depth / 2}px`
	);

	const componentStyles: ComponentStyles = reactive({
		base: {
			transformStyle: 'preserve-3d',
			transformOrigin: transformOrigin,
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
			props.color,
			props.colors,
			props.rsc,
			props.rscs,
			props.offset,
			props.offsets
		)
	);

	const $sides: SidesComponents = reactive({});

	onBeforeUpdate(() => {
		Object.assign($sides, {
			[Sides.front]: undefined,
			[Sides.back]: undefined,
			[Sides.left]: undefined,
			[Sides.right]: undefined,
			[Sides.top]: undefined,
			[Sides.bottom]: undefined,
		});
	});

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
	<div ref="$el" class="flux-cube" :style="style">
		<component
			:is="side!.component"
			v-for="side in sides"
			:ref="(el: any) => ($sides[side!.name as keyof typeof Sides] = el)"
			:key="side!.name"
			v-bind="side"
		/>
	</div>
</template>
