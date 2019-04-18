<template>
	<flux-grid
		:num-rows="1"
		:num-cols="numCols"
		:slider="slider"
		:images="images"
		ref="grid">
	</flux-grid>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'transitionBlinds2d',

		mixins: [
			BaseTransition,
		],

		components: {
			FluxGrid,
		},

		data: () => ({
			numCols: 1,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100,
			images: {
				front: {},
			},
		}),

		computed: {
			grid: function() {
				return this.$refs.grid;
			},
		},

		created() {
			vf = this.slider;

			let divider = vf.size.width / 10;

			vf.Transitions.setOptions(this, {
				numCols: Math.floor(vf.size.width / divider),
			});

			this.totalDuration = this.tileDelay * this.numCols + this.tileDuration;

			this.images.front = this.from.getProperties();
		},

		mounted() {
			currentImage.hide();

			this.grid.transform((tile, i) => {
				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: '0.1',
					transform: 'scaleX(0)',
				});
			});
		},

		methods: {
			getDelay(i) {
				let delay = i;

				if (this.direction === 'left')
					delay = this.numCols - i - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>
