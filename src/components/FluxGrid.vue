<script setup>
	import { ref, reactive, computed } from 'vue';
	import { floor, ceil } from '@/models/partials/math.js';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/component.js';

	const $el = ref(null);

	const props = defineProps({
		...baseProps,

		rscs: Object,

		rows: {
			type: Number,
			default: 1,
		},

		cols: {
			type: Number,
			default: 1,
		},

		depth: {
			type: Number,
			default: 0,
		},

		tileCss: Object,
	});

	const styles = reactive({
		base: {
			position: 'relative',
		},
	});

	const {
		style,
		setCss,
		show,
		hide,
	} = usePartials($el, props, styles);

	const component = computed(() => props.rscs? 'FluxCube' : 'FluxImage');

	const numRows = computed(() => ceil(props.rows));

	const numCols = computed(() => ceil(props.cols));

	const numTiles = computed(() => numRows * numCols);

	const tileSize = computed(() => ({
		width: floor(props.size.width / numCols),
		height: floor(props.size.height / numRows),
	}));

	const getRowNumber = i => floor(i / numCols);

	const getColNumber = i => i % numCols;

	const tiles = computed(() => {
		const tiles = [];

		for (let i = 0; i < numTiles.value; i++) {
			const tile = {
				row: getRowNumber(i),
				col: getColNumber(i),
			};

			let { width, height } = tileSize;

			if (tile.row + 1 === numRows)
				height = props.size.height - tile.row * height;

			if (tile.col + 1 === numCols)
				width = props.size.width - tile.col * width;

			tile.viewSize = {
				width,
				height,
			};

			tile.offset = {
				top: tile.row * tileSize.height,
				left: tile.col * tileSize.width,
			};

			tile.css = {
				...props.tileCss,
				position: 'absolute',
				left: tile.offset.left +'px',
				top: tile.offset.top +'px',
				zIndex: i + 1 < numTiles / 2? i + 1 : numTiles - i,
			};

			tiles.push(tile);
		}

		return tiles;
	});

	let $tiles = [];

	const transform = cb => $tiles.forEach((tile, i) => cb(tile, i));

	defineExpose(setCss, transform, show, hide);
</script>

<template>
	<div ref="grid" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			:ref="el => { if (el) $tiles[index] = el }"
			:key="index"
			:size="size"
			:view-size="tile.viewSize"
			:color="color"
			:image="img"
			:images="imgs"
			:offset="tile.offset"
			:depth="depth"
			:css="tile.css"
			:sides-css="tile.sidesCss"
		/>
	</div>
</template>
