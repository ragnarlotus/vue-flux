<script setup lang="ts">
	import { ref, Ref, onBeforeUpdate } from 'vue';
	import { vi } from 'vitest';
	import Tile from './Tile.vue';
	import { FluxVortexProps } from '../types';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		.mockImplementation((cb: (tile: any, index: number) => void) => {
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
		<Tile
			v-for="index in numTiles"
			:ref="(el: any) => $tiles.push(el)"
			:key="index"
		/>
	</div>
</template>
