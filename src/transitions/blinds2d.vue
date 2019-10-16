<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:image="from"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionBlinds2d',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 1,
			cols: 10,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100,
		}),

		created() {
			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
		},

		played() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0.1',
					transform: 'scaleX(0)',
				});
			});
		},

		methods: {
			getDelayPrev(i) {
				return (this.cols - i - 1) * this.tileDelay;
			},

			getDelayNext(i) {
				return i * this.tileDelay;
			},
		},
	};
</script>
