<template>
	<div :style="style">
		<flux-cube
			v-for="i in numTiles"
			:key="i"
			:slider="slider"
			:index="index"
			:css="getTileCss(i)"
			ref="tiles">
		</flux-cube>
	</div>
</template>

<script>
	import FluxBase from '@/mixins/FluxBase.js';
	import FluxCube from '@/components/FluxCube.vue';

	export default {
		name: 'FluxGrid',

		components: {
			FluxCube
		},

		mixins: {
			FluxBase
		},

		data: () => ({
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
			slider: {
				type: Object,
				required: false
			},

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

			tileCss: {
				type: Object,
				required: false
			}
		},

		computed: {
			tiles: function() {
				return this.$refs.tiles;
			}
		},

		created() {
			this.numTiles = this.numRows * this.numCols;
		},

		mounted() {
			let display = this.display.size;

			this.tile.width = display.width / this.numCols;
			this.tile.height = display.height / this.numRows;
		},

		methods: {
			getRowNumber(i) {
				return row = Math.floor(i / this.numCols);
			},

			getColNumber(i) {
				return col = i % this.numCols;
			},

			getTileCss(i) {
				i--;

				let row = this.getRowNumber(i);
				let col = this.getColNumber(i);

				let width = this.tile.width;
				let height = this.tile.height;

				if (col + 1 == this.numCols)
					width = this.slider.size.width - col * this.tile.width;

				if (row + 1 == this.numRows)
					height = this.slider.size.height - row * this.tile.height;

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

			transform(func) {
				this.$nextTick(() => {
					this.tiles.forEach((tile, i) => func(tile, i));
				});
			}
		}
	};
</script>
