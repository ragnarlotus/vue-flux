<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:colors="colors"
		:depth="size.height"
		:style="style"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionWave',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 1,
			cols: 8,
			tileDuration: 900,
			totalDuration: 0,
			easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
			tileDelay: 110,
			sideColor: '#333',
			style: {
				overflow: 'visible',
				perspective: '1200px',
			},
			images: undefined,
			colors: undefined,
		}),

		created() {
			this.mask.overflow = 'visible';

			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;

			this.images = {
				front: this.from,
				top: this.to,
			};
		},

		played() {
			if (this.current)
				this.current.hide();

			this.colors = {
				left: this.sideColor,
				right: this.sideColor,
			};

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turnBottom();
			});
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},
		},
	};
</script>
