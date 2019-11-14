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
		name: 'TransitionBlocks1',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 8,
			cols: 8,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 1000,
		}),

		created() {
			if (!this.options.rows) {
				let divider = this.size.width / this.cols;
				this.rows = Math.floor(this.size.height / divider);
			}

			this.totalDuration = this.tileDelay + this.tileDuration;
		},

		played() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: 'scale(0.3, 0.3)',
				});
			});
		},

		methods: {
			getDelay() {
				let delay = Math.random() * this.tileDelay;

				return Math.floor(delay);
			},
		},
	};
</script>
