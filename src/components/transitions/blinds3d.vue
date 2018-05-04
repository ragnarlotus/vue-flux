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
			easing: 'ease-out',
			tileDelay: 150,
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
				front: this.slider.currentImage.index,
				back: this.slider.nextImage.index
			};

			this.numCols = Math.floor(this.slider.size.width / 120);
			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;
		},

		mounted() {
			this.slider.currentImage.hide();
			this.slider.nextImage.hide();

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
			this.slider.currentImage.show();
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
