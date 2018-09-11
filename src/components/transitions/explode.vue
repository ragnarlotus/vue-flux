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
			index: {},
			numRows: 0,
			numCols: 0,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 1000
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
			let divider = this.slider.size.width / 8;

			this.slider.setTransitionOptions(this, {
				numRows: Math.floor(this.slider.size.height / divider),
				numCols: Math.floor(this.slider.size.width / divider)
			});

			this.totalDuration = this.tileDelay + this.tileDuration;

			this.index = {
				front: this.slider.currentImage.index
			};
		},

		mounted() {
			this.slider.currentImage.hide();

			this.grid.transform((tile, i) => {
				tile.front.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay() +'ms',
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
			getDelay() {
				let delay = Math.random() * this.tileDelay;

				return Math.floor(delay);
			}
		}
	};
</script>

