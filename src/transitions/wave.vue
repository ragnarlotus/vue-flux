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

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionWave',

		components: {
			FluxGrid
		},

		data: () => ({
			numRows: 1,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease-out',
			tileDelay: 150,
			sideColor: '#333',
			images: {
				front: {}
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
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;

			this.images = {
				front: currentImage.getProperties(),
				top: nextImage.getProperties(),
				bottom: nextImage.getProperties(),
				left: {
					color: this.sideColor,
				},
				right: {
					color: this.sideColor,
				},
			};
		},

		mounted() {
			currentImage.hide();
			nextImage.hide();

			this.grid.setCss({
				perspective: '1200px'
			});

			this.grid.transform((tile, i) => {
				tile.setCss({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms'
				});

				tile.turn(this.direction === 'right'? 'bottom' : 'top');
			});
		},

		destroyed() {
			nextImage.show();
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
