<template>
	<flux-grid
		:rows="rows"
		:cols="cols"
		:size="size"
		:image="from"
		ref="grid">
	</flux-grid>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'transitionBlocks2',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 8,
			cols: 8,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'ease',
			tileDelay: 80,
		}),

		created() {
			let divider = this.size.width / this.cols;
			this.rows = Math.floor(this.size.height / divider);

			this.totalDuration = this.tileDelay * (this.rows + this.cols) + this.tileDuration;
		},

		mounted() {
			this.$refs.grid.transform((tile, i) => {
				tile.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: 0,
					transform: 'scale(0.4, 0.4)',
				});
			});
		},

		methods: {
			getDelay(i) {
				let row = this.$refs.grid.getRowNumber(i);
				let col = this.$refs.grid.getColNumber(i);
				let delay = col + row;

				return delay * this.tileDelay;
			},
		},
	};
</script>
