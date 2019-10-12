<template>
	<div ref="grid" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			ref="tiles"
			:key="index"
			:size="size"
			:color="color"
			:colors="colors"
			:image="img"
			:images="imgs"
			:offset="tile.offset"
			:depth="depth"
			:css="tile.css"
			:sides-css="tile.sidesCss"
		/>
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxGrid',

		components: {
			FluxCube,
			FluxImage,
		},

		mixins: [
			BaseComponent,
		],

		props: {
			rows: {
				type: Number,
				default: 1,
			},

			cols: {
				type: Number,
				default: 1,
			},

			depth: Number,

			tileCss: Object,
		},

		data: () => ({
			baseStyle: {
				position: 'relative',
			},
		}),

		computed: {
			component() {
				return this.images? 'FluxCube' : 'FluxImage';
			},

			numRows() {
				return Math.round(parseFloat(this.rows));
			},

			numCols() {
				return Math.round(parseFloat(this.cols));
			},

			numTiles() {
				return this.numRows * this.numCols;
			},

			tileSize() {
				return {
					width: Math.ceil(this.size.width / this.numCols),
					height: Math.ceil(this.size.height / this.numRows),
				};
			},

			tiles() {
				let tile;
				let tiles = [];

				for (let i = 0; i < this.numTiles; i++) {
					tile = {
						row: this.getRowNumber(i),
						col: this.getColNumber(i),
					};

					let { width, height } = this.tileSize;

					if (tile.row + 1 === this.numRows)
						height = this.size.height - tile.row * height;

					if (tile.col + 1 === this.numCols)
						width = this.size.width - tile.col * width;

					tile.offset = {
						top: tile.row * this.tileSize.height,
						left: tile.col * this.tileSize.width,
					};

					tile.css = {
						...this.tileCss,
						position: 'absolute',
						left: tile.offset.left +'px',
						top: tile.offset.top +'px',
						width: width +'px',
						height: height +'px',
						zIndex: i + 1 < this.numCols / 2? i + 1 : this.numCols - i,
					};

					let sideSize = {
						width: width +'px',
						height: height +'px',
					};

					tile.sidesCss = {
						front: sideSize,
						back: sideSize,
						top: sideSize,
						bottom: sideSize,
						left: sideSize,
						right: sideSize,
					};

					tiles.push(tile);
				}

				return tiles;
			},
		},

		methods: {
			getRowNumber(i) {
				return Math.floor(i / this.numCols);
			},

			getColNumber(i) {
				return i % this.numCols;
			},

			transform(func) {
				this.$refs.tiles.forEach((tile, i) => func(tile, i));
			},
		},
	};
</script>
