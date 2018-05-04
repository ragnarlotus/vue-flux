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
			this.numRows = Math.floor(this.slider.size.height / 90);
			this.numCols = Math.floor(this.slider.size.width / 90);
			this.totalDuration = this.tileDelay + this.tileDuration;
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, i) => {
				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay() +'ms',
					opacity: '0',
					transform: 'scale(0.4, 0.4)'
				});
			});
		},

		methods: {
			getDelay() {
				let delay = Math.random() * this.tileDelay;

				return Math.floor(delay);
			}
		}
	};
</script>
