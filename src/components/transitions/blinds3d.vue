<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '../FluxGrid.vue';

	export default {
		name: 'transitionBlinds3d',

		components: {
			FluxGrid
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			index: {},
			numRows: 1,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease-out',
			tileDelay: 150,
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

			let divider = this.slider.size.width / 6;

			this.slider.setTransitionOptions(this, {
				numCols: Math.floor(this.slider.size.width / divider)
			});

			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;

			this.index = {
				front: this.currentImage.index,
				back: this.nextImage.index
			};
		},

		mounted() {
			this.currentImage.hide();
			this.nextImage.hide();

			this.grid.setCss({
				perspective: '800px'
			});

			let deg = this.getDeg();

			this.grid.transform((tile, i) => {
				tile.setCss({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms'
				});

				tile.turn('back', this.direction);
			});
		},

		destroyed() {
			this.nextImage.show();
		},

		methods: {
			getDelay(i) {
				let delay = i;

				if (this.direction === 'left')
					delay = this.numCols - i - 1;

				return delay * this.tileDelay;
			},

			getDeg() {
				return this.direction === 'right'? '180' : '-180';
			}
		}
	};
</script>
