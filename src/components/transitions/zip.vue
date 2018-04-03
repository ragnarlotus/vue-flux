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
			numRows: 1,
			numCols: 0,
			tileDuration: 600,
			totalDuration: 0,
			easing: 'ease-in',
			tileDelay: 80,
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
			this.numCols = parseInt(this.size.width / 70);
			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;
			this.css = Object.assign({}, this.slider.currentImage.style);
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, index) => {
				let delay = this.tileDelay * (this.direction === 'right'? index : this.numCols - index - 1);

				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ delay +'ms',
					opacity: '0.1',
					transform: 'translateY('+ (index % 2 === 0? '-' : '') + this.size.height +'px)'
				});
			});
		},

		destroyed() {
			this.slider.nextImage.show();
		}
	};
</script>
