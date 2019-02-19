<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionBlocks1',

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
			nextImage = vf.Images.next;

			let divider = vf.size.width / 8;

			vf.Transitions.setOptions(this, {
				numRows: Math.floor(vf.size.height / divider),
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay + this.tileDuration;

			this.index = {
				front: currentImage.index
			};
		},

		mounted() {
			currentImage.hide();

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
