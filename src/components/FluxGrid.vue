<template>
	<div ref="grid" :style="style">
		<component
			:is="component"
			v-for="i in numTiles"
			ref="tiles"
			:key="i"
			:size="tiles[i - 1].size"
			:image="img"
			:images="images"
			:color="color"
			:offset="tiles[i - 1].offset"
			:depth="depth"
			:style="getTileStyle(i)"
		/>
	</div>
</template>

<script>
	import Dom from '@/libraries/Dom';
	import Img from '@/libraries/Img';
	import BaseComponent from '@/mixins/BaseComponent.js';
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

			color: [ String, Object ],

			image: [ String, Object ],

			images: Object,

			size: {
				type: Object,
				required: true,
			},

			depth: Number,

			tileCss: Object,
		},

		data: () => ({
			baseStyle: {
				display: 'inline-block',
				overflow: 'hidden',
				fontSize: 0,
			},
			img: null,
			tiles: [],
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

			sizeStyle() {
				let { width, height } = this.size;

				return {
					width: Dom.px(width),
					height: Dom.px(height),
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
				};
			},
		},

		watch: {
			image() {
				this.init();
			},
		},

		created() {
			this.init();

			for (let i = 0; i < this.numTiles; i++) {
				let tile = {
					row: this.getRowNumber(i),
					col: this.getColNumber(i),
					size: {
						...this.tileSize
					},
				};

				tile.offset = {
					top: tile.row * tile.size.height,
					left: tile.col * tile.size.width,
				};

				if (tile.row + 1 === this.numRows)
					tile.size.height = this.size.height - tile.row * tile.size.height;

				if (tile.col + 1 === this.numCols)
					tile.size.width = this.size.width - tile.col * tile.size.width;

				tile.zIndex = i + 1 < this.numCols / 2? i + 1 : this.numCols - i;

				this.tiles.push(tile);
			}
		},

		methods: {
			async init() {
				if (!this.image)
					return;

				if (this.image instanceof Img) {
					this.img = this.image;
					return;
				}

				this.img = new Img(this.image);
				await this.img.load();
				this.img.resizeToCover(this.size);
			},

			getRowNumber(i) {
				return Math.floor(i / this.numCols);
			},

			getColNumber(i) {
				return i % this.numCols;
			},

			getTileStyle(i) {
				i--;

				let { top, left } = this.tiles[i].offset;

				return {
					...this.tileCss,
					transform: `translate3d(${left}px, ${top}px)`,
					zIndex: this.tiles[i].zIndex,
				};
			},

			transform(func) {
				this.$nextTick(() => {
					this.$refs.tiles.forEach((tile, i) => func(tile, i));
				});
			},
		},
	};
</script>
