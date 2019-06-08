<template>
	<flux-grid
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:color="color"
		:depth="size.height"
		:css="gridCss"
		ref="grid">
	</flux-grid>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'transitionWave',

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
			perspective: '1200px',
			easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
			tileDelay: 110,
			sideColor: '#333',
			images: {},
			color: {},
		}),

		computed: {
			gridCss() {
				return {
					perspective: this.perspective,
				};
			}
		},

		created() {
			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;

			this.images = {
				front: this.from,
				top: this.to,
			};

			this.color = {
				left: this.sideColor,
				right: this.sideColor,
			};
		},

		mounted() {
			this.mask.overflow = 'visible';

			this.current.hide();

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turnBottom();
			});
		},

		beforeDestroy() {
			this.current.show();
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},
		},
	};
</script>
