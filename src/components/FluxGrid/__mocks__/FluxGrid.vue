<script setup lang="ts">
	import { onBeforeUpdate, ref, Ref } from 'vue';
	import { vi } from 'vitest';
	import Tile from './Tile.vue';
	import { FluxGridProps } from '../types';
	import { getRowNumber, getColNumber } from '../factories';

	const props = withDefaults(defineProps<FluxGridProps>(), {
		rows: 1,
		cols: 1,
		depth: 0,
	});

	const $el: Ref<null | HTMLDivElement> = ref(null);

	const numTiles = props.rows * props.cols;
	const $tiles: Ref<InstanceType<typeof Tile>[]> = ref([]);

	onBeforeUpdate(() => {
		$tiles.value = [];
	});

	const transform = vi
		.fn()
		.mockImplementation((cb: (tile: any, index: number) => void) => {
			$tiles.value.forEach((tile: any, index: number) => cb(tile, index));
		});

	defineExpose({
		setCss: vi.fn(),
		transform,
		show: vi.fn(),
		hide: vi.fn(),
		getRowNumber: vi
			.fn()
			.mockImplementation((index: number, numCols: number) =>
				getRowNumber(index, numCols)
			),
		getColNumber: vi
			.fn()
			.mockImplementation((index: number, numCols: number) =>
				getColNumber(index, numCols)
			),
		$tiles,
	});
</script>

<template>
	<div ref="$el" class="flux-grid">
		<Tile
			v-for="index in numTiles"
			:ref="(el: any) => $tiles.push(el)"
			:key="index"
		/>
	</div>
</template>
