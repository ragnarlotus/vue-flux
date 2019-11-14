<template>
	<div>
		<flux-grid
			ref="grid"
			:rows="rows"
			:cols="cols"
			:size="size"
			:image="gridImage"
			:tile-css="tileCss"
			:css="gridCss"
		/>

		<flux-image
			v-if="backgroundImage"
			ref="background"
			:size="size"
			:image="backgroundImage"
			:css="backgroundCss"
		/>
	</div>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionBlocks2',

		components: {
			FluxGrid,
			FluxImage,
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
			gridImage: undefined,
			tileCss: {},
			gridCss: {
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 2,
			},
			backgroundImage: undefined,
			backgroundCss: {
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 1,
			},
		}),

		created() {
			if (!this.options.rows) {
				let divider = this.size.width / this.cols;
				this.rows = Math.floor(this.size.height / divider);
			}

			this.totalDuration = this.tileDelay * (this.rows + this.cols) + this.tileDuration;
		},

		methods: {
			setupPrev() {
				this.gridImage = this.to;
				this.backgroundImage = this.from;

				this.tileCss = {
					opacity: 0,
					transform: 'scale(0.3)',
				};
			},

			setupNext() {
				this.gridImage = this.from;
			},

			playPrev() {
				this.$refs.grid.transform((tile, i) => {
					tile.transform({
						transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i, 'prev')}ms`,
						opacity: 1,
						transform: 'scale(1)',
					});
				});
			},

			playNext() {
				this.$refs.grid.transform((tile, i) => {
					tile.transform({
						transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i, 'next')}ms`,
						opacity: 0,
						transform: 'scale(0.3)',
					});
				});
			},

			getDelay(i, direction) {
				let row = this.$refs.grid.getRowNumber(i);
				let col = this.$refs.grid.getColNumber(i);
				let delay = col + row;

				if (direction === 'prev')
					delay = this.rows + this.cols - delay - 1;

				return delay * this.tileDelay;
			},
		},
	};
</script>
