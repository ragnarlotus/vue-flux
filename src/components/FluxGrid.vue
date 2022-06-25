<script setup>
	import { ref, reactive, computed } from 'vue';
	import { floor, ceil } from '@/models/libs/math.js';
	import useComponentMixin, {
		baseProps,
	} from '@/models/mixins/component.js';
	import FluxImage from './FluxImage.vue';
	import FluxCube from './FluxCube.vue';

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
	} = useComponentMixin($el, props, styles);

	const component = computed(() => props.rscs? FluxCube : FluxImage);

	const numRows = computed(() => ceil(props.rows));

	const numCols = computed(() => ceil(props.cols));

	const numTiles = computed(() => numRows.value * numCols.value);

	const tileSize = computed(() => ({
		width: floor(props.size.width / numCols.value),
		height: floor(props.size.height / numRows.value),
	}));

	const getRowNumber = i => floor(i / numCols.value);

	const getColNumber = i => i % numCols.value;

	const tiles = computed(() => {
		const tiles = [];

		for (let i = 0; i < numTiles.value; i++) {
			const tile = {
				row: getRowNumber(i),
				col: getColNumber(i),
			};

			let { width, height } = tileSize.value;

			tile.offset = {
				top: tile.row * height,
				left: tile.col * width,
			};

			if (tile.row + 1 === numRows.value)
				height = props.size.height - tile.row * height;

			if (tile.col + 1 === numCols.value)
				width = props.size.width - tile.col * width;

			tile.viewSize = {
				width,
				height,
			};

			tile.css = {
				...props.tileCss,
				position: 'absolute',
				left: tile.offset.left +'px',
				top: tile.offset.top +'px',
				zIndex: i + 1 < numTiles.value / 2? i + 1 : numTiles.value - i,
			};

			tiles.push(tile);
		}

		return tiles;
	});

	const $tiles = ref([]);

	const transform = cb => {
		$tiles.value.forEach((tile, i) => cb(tile, i));
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
			:ref="el => $tiles.push(el)"
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
