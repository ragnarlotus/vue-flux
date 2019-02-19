<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage;

	export default {
		name: 'transitionWaterfall',

		components: {
			FluxGrid
		},

		data: () => ({
			index: {},
			numRows: 1,
			numCols: 0,
			tileDuration: 600,
			totalDuration: 0,
			easing: 'ease-in',
			tileDelay: 80,
		}),

		props: {
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			grid: function() {
				return this.$refs.grid;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;

			let divider = this.vf.size.width / 10;

			vf.Transitions.setOptions(this, {
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;

			this.index = {
				front: currentImage.index
			};
		},

		mounted() {
			currentImage.hide();

			this.grid.setCss({
				overflow: 'hidden'
			});

			this.grid.transform((tile, i) => {
				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: '0.1',
					transform: 'translateY('+ this.vf.size.height +'px)'
				});
			});
		},

		methods: {
			getDelay(i) {
				let delay = i;

				if (this.direction === 'left')
					delay = this.numCols - i - 1;

				return delay * this.tileDelay;
			}
		}
	};
</script>
