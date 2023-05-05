<script setup lang="ts">
	import { ref, reactive, computed, CSSProperties } from 'vue';
	import { floor, ceil } from '../../shared/Maths';
	import useComponentMixin, { ComponentProps } from '../../mixins/component';
	import { FluxImage, FluxCube } from '../';
	import Size from '../../shared/Size';
	import { ComponentStyles } from '../../types';
	import { SidesResources } from '../FluxCube/types';

	interface Props extends ComponentProps {
		rscs?: SidesResources;
		rows?: number;
		cols?: number;
		depth?: number;
		tileCss?: CSSProperties;
	}

	const props = withDefaults(defineProps<Props>(), {
		rows: 1,
		cols: 1,
		depth: 0,
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			position: 'relative',
		},
	});

	const { style, setCss, show, hide } = useComponentMixin(
		$el,
		props,
		componentStyles
	);

	const component = computed(() =>
		props.rscs !== null ? FluxCube : FluxImage
	);

	const numRows = computed<number>(() => ceil(props.rows));

	const numCols = computed<number>(() => ceil(props.cols));

	const numTiles = computed<number>(() => numRows.value * numCols.value);

	const tileSize = computed<Size>(
		() =>
			new Size({
				width: floor(props.size.width.value! / numCols.value),
				height: floor(props.size.height.value! / numRows.value),
			})
	);

	const getRowNumber = (row: number) => floor(row / numCols.value);

	const getColNumber = (col: number) => col % numCols.value;

	const tiles = computed(() => {
		const tiles = [];

		for (let i = 0; i < numTiles.value; i++) {
			const tile = {
				row: getRowNumber(i),
				col: getColNumber(i),
			} as any;

			let { width, height } = tileSize.value.toRaw();

			tile.offset = {
				top: tile.row * height,
				left: tile.col * width,
			};

			if (tile.row + 1 === numRows.value) {
				height = props.size.height.value! - tile.row * height;
			}

			if (tile.col + 1 === numCols.value) {
				width = props.size.width.value! - tile.col * width;
			}

			tile.viewSize = {
				width,
				height,
			};

			tile.css = {
				...props.tileCss,
				position: 'absolute',
				left: tile.offset.left + 'px',
				top: tile.offset.top + 'px',
				zIndex: i + 1 < numTiles.value / 2 ? i + 1 : numTiles.value - i,
			};

			tiles.push(tile);
		}

		return tiles;
	});

	const $tiles = ref([]);

	const transform = (cb: Function) => {
		$tiles.value.forEach((tile: any, index: number) => cb(tile, index));
	};

	defineExpose({
		setCss,
		transform,
		show,
		hide,
		getRowNumber,
		getColNumber,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			:ref="(el) => $tiles.push(el)"
			:key="index"
			:size="size"
			v-bind="tile"
			:color="color"
			:rsc="rsc"
			:rscs="rscs"
			:depth="depth"
		/>
	</div>
</template>
