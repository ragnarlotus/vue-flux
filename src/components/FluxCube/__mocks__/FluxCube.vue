<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { vi } from 'vitest';
	import Side from './Side.vue';
	import { FluxCubeProps, Turn } from '../types';
	import { Size } from '../../../shared';
	import CubeFactory from '../factories/CubeFactory';
	import SideTransformFactory from '../factories/SideTransformFactory';

	const props = withDefaults(defineProps<FluxCubeProps>(), {
		rscs: () => ({}),
		colors: () => ({}),
		offsets: () => ({}),
		depth: 0,
		viewSize: () => new Size(),
	});

	const $el = ref(null);

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

	const turn = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_turn: Turn) => vi.fn());

	defineExpose({
		setCss: vi.fn(),
		transform: vi.fn(),
		show: vi.fn(),
		hide: vi.fn(),
		turn,
	});
</script>

<template>
	<div ref="$el" class="flux-cube">
		<Side
			:is="side!.component"
			v-for="side in sides"
			:key="side!.name"
			v-bind="side"
		/>
	</div>
</template>
