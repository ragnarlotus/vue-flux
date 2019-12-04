<template>
	<flux-cube
		ref="cube"
		:images="images"
		:size="size"
		:depth="size.width"
		:css="cubeCss"
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
			cubeCss: {},
		}),

		created() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			this.cubeCss.transition = `all ${this.totalDuration}ms ${this.easing}`;

			this.images = {
				front: this.from,
				left: this.to,
				right: this.to,
			};
		},

		played() {
			if (this.current)
				this.current.hide();

			let sides = {
				next: 'left',
				prev: 'right',
			};

			this.$refs.cube.turn(sides[this.direction]);
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},
	};
</script>
