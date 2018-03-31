<template>
	<div class="grid">
		<tile v-for="i in numTiles" :key="i" :row="getRow(i)" :col="getCol(i)" :css="getCss(i)" ref="tiles"></tile>
	</div>
</template>

<script>
	import tile from './tile.vue';

	export default {
		name: 'VueFluxGrid',

		components: {
			tile
		},

		data: () => ({
			numTiles: 0,
			tile: {
				width: 1,
				height: 1,
				remainder: {
					width: 0,
					height: 0
				}
			}
		}),

		props: {
			size: Object,
			numRows: Number,
			numCols: Number,
			css: Object
		},

		created() {
			this.numTiles = this.numRows * this.numCols;

			this.tile.width = Math.floor(this.size.width / this.numCols);
			this.tile.height = Math.floor(this.size.height / this.numRows);

			this.tile.remainder.width = this.size.width % this.numCols;
			this.tile.remainder.height = this.size.height % this.numRows;
		},

		methods: {
			getRow(i) {
				let row = parseInt(i / this.numCols);

				if (i % this.numCols === 0)
					row--;

				return row;
			},

			getCol(i) {
				let col = i % this.numCols;

				if (col === 0)
					col = this.numCols;

				return col - 1;
			},

			getCss(i) {
				let row = this.getRow(i);
				let col = this.getCol(i);

				let width = this.tile.width + (col < this.tile.remainder.width? 1 : 0);
				let height = this.tile.height + (row < this.tile.remainder.height? 1 : 0);

				let top = row * this.tile.height + (row < this.tile.remainder.height? row : this.tile.remainder.height);
				let left = col * this.tile.width + (col < this.tile.remainder.width? col : this.tile.remainder.width);

				return Object.assign({}, this.css, {
					top: top +'px',
					left: left +'px',
					width: width +'px',
					height: height +'px',
					'background-position': (this.css.left - left) +'px '+ (this.css.top - top) +'px'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.grid {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 12;
	}
</style>
