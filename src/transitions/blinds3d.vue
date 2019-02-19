<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :src="src" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionBlinds3d',

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

			let divider = vf.size.width / 6;

			vf.Transitions.setOptions(this, {
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;

			this.src = {
				front: currentImage.index,
				back: nextImage.index
			};
		},

		mounted() {
			currentImage.hide();
			nextImage.hide();

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
			nextImage.show();
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
