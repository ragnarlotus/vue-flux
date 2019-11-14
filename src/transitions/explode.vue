<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:image="from"
		:css="cssGrid"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionExplode',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 9,
			cols: 9,
			tileDuration: 300,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 100,
			cssGrid: {
				overflow: 'visible',
			},
		}),

		created() {
			this.mask.overflow = 'visible';

			if (!this.options.rows) {
				let divider = this.size.width / this.cols;
				this.rows = Math.floor(this.size.height / divider);
			}

			this.totalDuration = (this.cols / 2 + this.rows / 2) * (this.tileDelay * 2);
		},

		played() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					borderRadius: '100%',
					opacity: '0',
					transform: 'scale(1.6, 1.6)',
				});
			});
		},

		methods: {
			getDelay(i) {
				let { grid } = this.$refs;

				let row = grid.getRowNumber(i);
				let col = grid.getColNumber(i);

				let rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
				let colDelay = Math.abs(this.cols / 2 - 0.5 - col);
				let delay = rowDelay + colDelay - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>
