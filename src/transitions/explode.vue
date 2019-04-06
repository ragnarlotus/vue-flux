<template>
	<flux-grid
		:slider="slider"
		:num-rows="numRows"
		:num-cols="numCols"
		:images="images"
		ref="grid">
	</flux-grid>
</template>

<script>
	import FluxGrid from '@/components/FluxGrid.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionExplode',

		components: {
			FluxGrid,
		},

		data: () => ({
			numRows: 0,
			numCols: 0,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100,
			images: {
				front: {},
			},
		}),

		props: {
			slider: {
				type: Object,
				required: true,
			},
		},

		computed: {
			grid: function() {
				return this.$refs.grid;
			},
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			let divider = vf.size.width / 9;

			vf.Transitions.setOptions(this, {
				numRows: Math.floor(vf.size.height / divider),
				numCols: Math.floor(vf.size.width / divider),
			});

			this.totalDuration = (this.numCols / 2 + this.numRows / 2) * (this.tileDelay * 2);

			this.images.front = currentImage.getProperties();
		},

		mounted() {
			currentImage.hide();

			this.grid.transform((tile, i) => {
				tile.front.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					borderRadius: '100%',
					opacity: '0',
					transform: 'scale(1.6, 1.6)',
				});
			});
		},

		destroyed() {
			vf.mask.style.perspective = 'none';
		},

		methods: {
			getDelay(i) {
				let row = this.grid.getRowNumber(i);
				let col = this.grid.getColNumber(i);

				let delay = Math.abs(this.numRows / 2 - 0.5 - row) + Math.abs(this.numCols / 2 - 0.5 - col) - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>
