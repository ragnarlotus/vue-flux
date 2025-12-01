<script setup lang="ts">
	import { ref, type Ref, onBeforeUpdate } from 'vue';
	import { vi } from 'vitest';
	import Tile from './Tile.vue';
	import type { FluxVortexProps } from '../types';

	const props = withDefaults(defineProps<FluxVortexProps>(), {
		circles: 1,
	});

	const $el: Ref<null | HTMLDivElement> = ref(null);

	const numTiles = props.circles;
	const $tiles: Ref<InstanceType<typeof Tile>[]> = ref([]);

	onBeforeUpdate(() => {
		$tiles.value = [];
	});

	const transform = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.mockImplementation((cb: (tile: any, index: number) => void) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			$tiles.value.forEach((tile: any, index: number) => cb(tile, index));
		});

	defineExpose({
		setCss: vi.fn(),
		transform,
		show: vi.fn(),
		hide: vi.fn(),
		getRowNumber: vi.fn(),
		getColNumber: vi.fn(),
		$tiles,
	});
</script>

<template>
	<div ref="$el" class="flux-vortex">
		<Tile v-for="index in numTiles" :ref="(el: any) => $tiles.push(el)" :key="index" />
	</div>
</template>
