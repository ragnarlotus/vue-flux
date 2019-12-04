<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:depth="0"
		:image="from"
		:css="gridCss"
		:tile-css="tileCss"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionRound2',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 9,
			cols: 9,
			tileDuration: 800,
			totalDuration: 0,
			rotateX: '-540',
			easing: 'linear',
			tileDelay: 100,
			gridCss: {
				perspective: '1200px',
			},
			tileCss: {
				backfaceVisibility: 'hidden',
			},
		}),

		created() {
			this.mask.overflow = 'visible';

			if (!this.options.rows) {
				let divider = this.size.width / this.cols;
				this.rows = Math.floor(this.size.height / divider);
			}

			this.totalDuration = (this.cols / 2 + this.rows) * (this.tileDelay * 2);
		},

		played() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: `rotateY(${this.rotateX}deg)`,
				});
			});
		},

		methods: {
			getDelay(i) {
				let { grid } = this.$refs;

				let row = grid.getRowNumber(i);
				let col = grid.getColNumber(i);

				let rowDelay, colDelay;

				if (this.direction === 'prev') {
					rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
					colDelay = Math.abs(this.cols - col);

				} else {
					rowDelay = Math.abs(this.rows / 2 - 0.5 - row);
					colDelay = Math.abs(col);
				}

				let delay = rowDelay + colDelay - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>

