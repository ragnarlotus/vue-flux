<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" :tile-css="tileCss" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		name: 'transitionBlocks3d',

		components: {
			FluxGrid
		},

		data: () => ({
			index: {},
			numRows: 1,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease-out',
			tileDelay: 150,
			tileCss: {}
		}),

		props: {
			slider: Object
		},

		computed: {
			grid: function() {
				return this.$refs.grid;
			}
		},

		created() {
			this.slider.setTransitionOptions(this, {
				numRows: Math.floor(this.slider.size.height / 120),
				numCols: Math.floor(this.slider.size.width / 120)
			});

			this.totalDuration = this.tileDelay * (this.numRows > this.numCols? this.numRows : this.numCols) * 2 + this.tileDelay;

			this.index = {
				front: this.slider.currentImage.index,
				back: this.slider.nextImage.index
			};
		},

		mounted() {
			this.slider.currentImage.hide();
			this.slider.nextImage.hide();

			this.grid.setCss({
				perspective: '800px'
			});

			this.grid.transform((tile, i) => {
				tile.setCss({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms'
				});

				tile.turn('back', this.direction);
			});
		},

		destroyed() {
			this.slider.currentImage.show();
		},

		methods: {
			getDelay(i) {
				let row = this.grid.getRow(i);
				let col = this.grid.getCol(i);
				let delay = col + row;

				if (this.direction === 'left')
					delay = this.numRows + this.numCols - delay - 1;

				return delay * this.tileDelay;
			}
		}
	};
</script>
