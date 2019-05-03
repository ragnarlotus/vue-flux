<template>
	<flux-grid
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:color="color"
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
			tileDuration: 80000,
			totalDuration: 0,
			perspective: '1200px',
//			easing: 'ease-out',
			easing: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
			tileDelay: 15000,
			sideColor: '#333',
			images: {},
			color: {},
		}),

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
			this.mask.perspective = this.perspective;
			this.mask.overflow = 'visible';

			if (this.current)
				this.current.hide();

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
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
