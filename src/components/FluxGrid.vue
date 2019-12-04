<template>
	<div ref="grid" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			ref="tiles"
			:key="index"
			:size="size"
			:view-size="tile.viewSize"
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

			depth: {
				type: Number,
				default: 0,
			},

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
				return Math.ceil(parseFloat(this.rows));
			},

			numCols() {
				return Math.ceil(parseFloat(this.cols));
			},

			numTiles() {
				return this.numRows * this.numCols;
			},

			tileSize() {
				return {
					width: Math.floor(this.size.width / this.numCols),
					height: Math.floor(this.size.height / this.numRows),
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

					tile.viewSize = {
						width,
						height,
					};

					tile.offset = {
						top: tile.row * this.tileSize.height,
						left: tile.col * this.tileSize.width,
					};

					tile.css = {
						...this.tileCss,
						position: 'absolute',
						left: tile.offset.left +'px',
						top: tile.offset.top +'px',
						zIndex: i + 1 < this.numTiles / 2? i + 1 : this.numTiles - i,
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
