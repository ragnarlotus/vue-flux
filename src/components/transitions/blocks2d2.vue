<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" :css="css" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		components: {
			FluxGrid
		},

		data: () => ({
			index: {},
			numRows: 1,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease',
			tileDelay: 80,
			css: {}
		}),

		props: {
			slider: Object,
			direction: String
		},

		computed: {
			grid: function() {
				return this.$refs.grid;
			}
		},

		created() {
			this.index = {
				front: this.direction === 'right'? this.slider.currentImage.index : this.slider.nextImage.index
			};

			if (this.direction === 'left') {
				this.css = {
					opacity: 0,
					transform: 'scale(0.4, 0.4)'
				};
			}

			this.numRows = parseInt(this.slider.size.height / 90);
			this.numCols = parseInt(this.slider.size.width / 90);
			this.totalDuration = this.tileDelay * (this.numRows + this.numCols) + this.tileDuration;
		},

		mounted() {
			if (this.direction === 'right') {
				this.slider.currentImage.hide();

			} else {
				this.slider.nextImage.hide();
			}

			this.grid.transform((tile, i) => {
				let col = i % this.numCols;
				let row = parseInt(i / this.numCols);
				let delay = this.tileDelay * (this.direction === 'right'? col + row : this.numCols - col - 1 + this.numRows - row);

				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ delay +'ms',
					opacity: this.direction === 'right'? 0 : 1,
					transform: this.direction === 'right'? 'scale(0.4, 0.4)' : 'scale(1, 1)'
				});
			});
		},

		destroyed() {
			this.slider.currentImage.show();
			this.slider.nextImage.show();
		}
	};
</script>
