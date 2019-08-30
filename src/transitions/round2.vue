<template>
	<flux-grid
		:rows="rows"
		:cols="cols"
		:size="size"
		:image="from"
		:css="gridCss"
		ref="grid">
	</flux-grid>
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
		}),

		created() {
			let divider = this.size.width / this.cols;
			this.rows = Math.floor(this.size.height / divider);

			this.totalDuration = (this.cols / 2 + this.rows) * (this.tileDelay * 2);
		},

		mounted() {
			this.mask.overflow = 'visible';

			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: `rotateX(${this.rotateX}deg)`,
				});
			});
		},

		methods: {
			getDelay(i) {
				let grid = this.$refs.grid;

				let row = grid.getRowNumber(i);
				let col = grid.getColNumber(i);

				let rowDelay = Math.abs(this.rows - row);
				let colDelay = Math.abs(this.cols / 2 - 0.5 - col);
				let delay = rowDelay + colDelay - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>

