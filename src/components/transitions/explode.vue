<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		name: 'transitionExplode',

		components: {
			FluxGrid
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			index: {},
			numRows: 0,
			numCols: 0,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100
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
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			let divider = this.slider.size.width / 9;

			this.slider.setTransitionOptions(this, {
				numRows: Math.floor(this.slider.size.height / divider),
				numCols: Math.floor(this.slider.size.width / divider)
			});

			this.totalDuration = (this.numCols / 2 + this.numRows / 2) * (this.tileDelay * 2);

			this.index = {
				front: this.currentImage.index
			};
		},

		mounted() {
			this.currentImage.hide();

			this.grid.transform((tile, i) => {
				tile.front.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					borderRadius: '100%',
					opacity: '0',
					transform: 'scale(1.6, 1.6)'
				});
			});
		},

		destroyed() {
			this.slider.mask.style.perspective = 'none';
		},

		methods: {
			getDelay(i) {
				let row = this.grid.getRow(i);
				let col = this.grid.getCol(i);

				let delay = Math.abs(this.numRows / 2 - 0.5 - row) + Math.abs(this.numCols / 2 - 0.5 - col) - 1;

				return delay * this.tileDelay;
			}
		}
	};
</script>
