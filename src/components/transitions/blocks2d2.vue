<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" :tile-css="tileCss" ref="grid"></flux-grid>
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
			tileCss: {}
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

			if (this.direction === 'left') {
				this.index.front = this.slider.nextImage.index;

				this.tileCss = {
					opacity: 0,
					transform: 'scale(0.4, 0.4)'
				};
			}

			this.numRows = Math.floor(this.slider.size.height / 90);
			this.numCols = Math.floor(this.slider.size.width / 90);
			this.totalDuration = this.tileDelay * (this.numRows + this.numCols) + this.tileDuration;
		},

		mounted() {
			let opacity, transform;

			if (this.direction === 'right') {
				opacity = 0;
				transform = 'scale(0.4, 0.4)';
				this.slider.currentImage.hide();

			} else {
				opacity = 1;
				transform = 'scale(1, 1)';
				this.slider.nextImage.hide();
			}

			this.grid.transform((tile, i) => {
				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: opacity,
					transform: transform
				});
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
