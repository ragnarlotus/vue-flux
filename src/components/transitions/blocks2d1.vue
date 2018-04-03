<template>
	<flux-grid v-if="css" :num-rows="numRows" :num-cols="numCols" :size="size" :css="css" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		components: {
			FluxGrid
		},

		data: () => ({
			numRows: 0,
			numCols: 0,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 1000,
			size: {},
			css: undefined
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
			this.size = this.slider.size;
			this.numRows = parseInt(this.size.height / 90);
			this.numCols = parseInt(this.size.width / 90);
			this.totalDuration = this.tileDelay + this.tileDuration;
			this.css = Object.assign({}, this.slider.currentImage.style);
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, index) => {
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
