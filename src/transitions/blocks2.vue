<template>
	<flux-grid
		:num-rows="numRows"
		:num-cols="numCols"
		:slider="slider"
		:images="images"
		:tile-css="tileCss"
		ref="grid">
	</flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionBlocks2',

		components: {
			FluxGrid
		},

		data: () => ({
			numRows: 1,
			numCols: 1,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease',
			tileDelay: 80,
			tileCss: {},
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
			nextImage = vf.Images.next;

			let divider = vf.size.width / 8;

			vf.Transitions.setOptions(this, {
				numRows: Math.floor(vf.size.height / divider),
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay * (this.numRows + this.numCols) + this.tileDuration;

			this.images.front = currentImage.getProperties();

			if (this.direction === 'left') {
				this.images.front = nextImage.getProperties();

				this.tileCss = {
					opacity: 0,
					transform: 'scale(0.4, 0.4)'
				};
			}
		},

		mounted() {
			let opacity, transform;

			if (this.direction === 'right') {
				opacity = 0;
				transform = 'scale(0.4, 0.4)';
				currentImage.hide();

			} else {
				opacity = 1;
				transform = 'scale(1, 1)';
				nextImage.hide();
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
			nextImage.show();
		},

		methods: {
			getDelay(i) {
				let row = this.grid.getRowNumber(i);
				let col = this.grid.getColNumber(i);
				let delay = col + row;

				if (this.direction === 'left')
					delay = this.numRows + this.numCols - delay - 1;

				return delay * this.tileDelay;
			}
		}
	};
</script>
