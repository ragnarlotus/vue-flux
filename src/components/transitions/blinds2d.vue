<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
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
			easing: 'linear',
			tileDelay: 100
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
				front: this.slider.currentImage.index
			};
			this.numCols = parseInt(this.slider.size.width / 70);
			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, i) => {
				let delay = this.tileDelay * (this.direction === 'right'? i : this.numCols - i - 1);

				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ delay +'ms',
					opacity: '0.1',
					transform: 'scaleX(0)'
				});
			});
		},

		destroyed() {
			this.slider.nextImage.show();
		}
	};
</script>
