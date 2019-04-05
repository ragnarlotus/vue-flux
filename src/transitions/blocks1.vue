<template>
	<flux-grid
		:num-rows="numRows"
		:num-cols="numCols"
		:slider="slider"
		:images="images"
		ref="grid">
	</flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage;

	export default {
		name: 'transitionBlocks1',

		components: {
			FluxGrid
		},

		data: () => ({
			numRows: 1,
			numCols: 1,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 1000,
			images: {
				front: {},
			},
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

			let divider = vf.size.width / 8;

			vf.Transitions.setOptions(this, {
				numRows: Math.floor(vf.size.height / divider),
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay + this.tileDuration;

			this.images.front = currentImage.getProperties();
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
