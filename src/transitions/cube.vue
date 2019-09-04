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
			FluxCube
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1400,
			easing: 'ease-out',
			images: {},
		}),

		created() {
			this.images = {
				front: this.from,
				right: this.to,
			};
		},

		mounted() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});

			this.$refs.cube.transform({
				transition: `all ${this.totalDuration}ms ${this.easing}`,
			});

			this.$refs.cube.turnLeft();

			if (this.current)
				this.current.hide();
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},
	};
</script>
