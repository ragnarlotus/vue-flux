<template>
	<flux-cube
		ref="cube"
		:images="images"
		:size="size"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxCube from '@/components/FluxCube.vue';

	export default {
		name: 'TransitionCube',

		components: {
			FluxCube,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1400,
			easing: 'ease-out',
			images: undefined,
		}),

		created() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			this.images = {
				front: this.from,
				left: this.to,
				right: this.to,
			};
		},

		mounted() {
			this.$refs.cube.setCss({
				transition: `all ${this.totalDuration}ms ${this.easing}`,
			});
		},

		played() {
			if (this.current)
				this.current.hide();

			let direction = this.getDirection();

			let sides = {
				next: 'left',
				prev: 'right',
			};

			this.$refs.cube.turn(sides[direction]);
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},
	};
</script>
