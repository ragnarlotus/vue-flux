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
		name: 'TransitionWaterfall',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 1,
			cols: 10,
			tileDuration: 600,
			totalDuration: 0,
			easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
			tileDelay: 90,
		}),

		created() {
			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;
		},

		played() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0.1',
					transform: `translateY(100%)`,
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
