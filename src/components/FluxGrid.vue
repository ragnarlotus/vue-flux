<template>
	<div :style="style">
		<flux-cube
			v-for="i in numTiles"
			:key="i"
			:slider="slider"
			:display-size="display.size"
			:images="images"
			:image-src="imageSrc"
			:image-size="imageSize"
			:color="color"
			:css="getTileCss(i)"
			ref="tiles">
		</flux-cube>
	</div>
</template>

<script>
	import DisplayController from '@/controllers/Display.js';
	import FluxCube from '@/components/FluxCube.vue';

	export default {
		name: 'FluxGrid',

		components: {
			FluxCube
		},

		data: () => ({
			display: undefined,
			numTiles: 0,
			tile: {
				width: 1,
				height: 1
			},
			style: {
				position: 'absolute',
				width: '100%',
				height: '100%',
				zIndex: '12'
			}
		}),

		props: {
			numRows: {
				type: Number,
				required: false,
				default: () => 1
			},

			numCols: {
				type: Number,
				required: false,
				default: () => 1
			},

			slider: {
				type: Object,
				required: false,
			},

			displaySize: {
				type: Object,
				required: false,
			},

			images: {
				type: Object,
				required: false,
			},

			imageSrc: {
				type: String,
				required: false,
			},

			imageSize: {
				type: Object,
				required: false,
			},

			color: {
				type: String,
				required: false,
			},

			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0
				})
			},

			tileCss: {
				type: Object,
				required: false
			},
		},

		computed: {
			tiles: function() {
				return this.$refs.tiles;
			}
		},

		created() {
			this.display = new DisplayController(this);

			if (this.slider)
				this.display.setSize(this.slider.size);

			else if (this.displaySize)
				this.display.setSize(this.displaySize);

			else
				this.display.setSizeFrom(this.$refs.vortex);

			let size = this.display.size;

			this.tile.width = Math.ceil(size.width / this.numCols);
			this.tile.height = Math.ceil(size.height / this.numRows);

			this.numTiles = this.numRows * this.numCols;
		},

		methods: {
			getRowNumber(i) {
				return Math.floor(i / this.numCols);
			},

			getColNumber(i) {
				return i % this.numCols;
			},

			getTileCss(i) {
				i--;

				let row = this.getRowNumber(i);
				let col = this.getColNumber(i);

				let width = this.tile.width;
				let height = this.tile.height;

				if (col + 1 == this.numCols)
					width = this.display.size.width - col * this.tile.width;

				if (row + 1 == this.numRows)
					height = this.display.size.height - row * this.tile.height;

				let top = row * this.tile.height;
				let left = col * this.tile.width;

				let zIndex = i + 1 < this.numCols / 2? 13 + i : 13 + this.numCols - i;

				return {
					...this.tileCss,
					width: width +'px',
					height: height +'px',
					top: top +'px',
					left: left +'px',
					zIndex: zIndex
				};
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
			},

			transform(func) {
				this.$nextTick(() => {
					this.tiles.forEach((tile, i) => func(tile, i));
				});
			}
		}
	};
</script>
