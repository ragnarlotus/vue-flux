<template>
	<flux-grid :slider="slider" :num-rows="numRows" :num-cols="numCols" :index="index" ref="grid"></flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionRound2',

		components: {
			FluxGrid
		},

		data: () => ({
			index: {},
			numRows: 0,
			numCols: 0,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100
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

			let divider = vf.size.width / 9;

			vf.Transitions.setOptions(this, {
				numRows: Math.floor(vf.size.height / divider),
				numCols: Math.floor(vf.size.width / divider)
			});

			this.totalDuration = (this.numCols / 2 + this.numRows) * (this.tileDelay * 2);

			this.index = {
				front: this.currentImage.index
			};
		},

		mounted() {
			this.currentImage.hide();

			this.grid.setCss({
				perspective: '1200px'
			});

			this.grid.transform((tile, i) => {
				tile.front.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: '0',
					transform: 'rotateX(-540deg)'
				});
			});
		},

		methods: {
			getDelay(i) {
				let row = this.grid.getRow(i);
				let col = this.grid.getCol(i);

				let delay = Math.abs(this.numRows - row) + Math.abs(this.numCols / 2 - 0.5 - col) - 1;

				return delay * this.tileDelay;
			}
		}
	};
</script>

