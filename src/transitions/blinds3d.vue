<template>
	<flux-grid
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:css="gridCss"
		ref="grid">
	</flux-grid>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	export default {
		name: 'TransitionBlinds3d',

		components: {
			FluxGrid,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			rows: 1,
			cols: 6,
			tileDuration: 800,
			totalDuration: 0,
			perspective: '800px',
			easing: 'ease-out',
			tileDelay: 150,
			images: {},
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
				back: this.to,
			};
		},

		mounted() {
			this.mask.overflow = 'visible';

			this.current.hide();

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turnBack();
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
