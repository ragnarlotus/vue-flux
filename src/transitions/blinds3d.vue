<template>
	<flux-grid
		ref="grid"
		:rows="rows"
		:cols="cols"
		:size="size"
		:images="images"
		:style="style"
	/>
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
			easing: 'ease-out',
			tileDelay: 150,
			style: {
				overflow: 'visible',
				perspective: '800px',
			},
			images: undefined,
		}),

		created() {
			this.mask.overflow = 'visible';

			this.totalDuration = this.tileDelay * this.cols + this.tileDuration;

			this.images = {
				front: this.from,
				back: this.to,
			};
		},

		played() {
			if (this.current)
				this.current.hide();

			this.$refs.grid.transform((tile, i) => {
				tile.setCss({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
				});

				tile.turnBack();
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
