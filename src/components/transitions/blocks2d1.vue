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
			numRows: 0,
			numCols: 0,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 1000
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
			this.numRows = parseInt(this.slider.size.height / 90);
			this.numCols = parseInt(this.slider.size.width / 90);
			this.totalDuration = this.tileDelay + this.tileDuration;
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, i) => {
				let delay = Math.floor((Math.random() * this.tileDelay));

				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ delay +'ms',
					opacity: '0',
					transform: 'scale(0.4, 0.4)'
				});
			});
		},

		destroyed() {
			this.slider.nextImage.show();
		}
	};
</script>
