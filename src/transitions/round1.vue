<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:css="gridCss"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionRound1',

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
			easing: 'ease-out',
			tileDelay: 150,
			images: undefined,
			gridCss: {
				perspective: '800px',
			},
		}),

		created() {
			this.mask.overflow = 'visible';

			if (!this.options.rows) {
				let divider = this.size.width / this.cols;
				this.rows = Math.floor(this.size.height / divider);
			}

			let multiplier = this.rows > this.cols? this.rows : this.cols;
			this.totalDuration = this.tileDelay * multiplier * 2;

			this.images = {
				front: this.from,
				back: this.to,
			};
		},

		played() {
			if (this.current)
				this.current.hide();

			let sides = {
				prev: 'backl',
				next: 'backr',
			};

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turn(sides[this.direction]);
			});
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},

		methods: {
			getDelay(i) {
				let { grid } = this.$refs;

				let row = grid.getRowNumber(i);
				let col = grid.getColNumber(i);
				let delay = col + row;

				if (this.direction === 'prev')
					delay = this.rows + this.cols - delay - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>
