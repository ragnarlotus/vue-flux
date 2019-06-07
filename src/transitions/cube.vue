<template>
	<flux-cube :images="images" :size="size" ref="cube"></flux-cube>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxCube from '@/components/FluxCube.vue';

	export default {
		name: 'transitionCube',

		components: {
			FluxCube
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1400,
			perspective: '1600px',
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
			this.mask.perspective = this.perspective;
			this.mask.overflow = 'visible';

			if (this.current)
				this.current.hide();

			this.$refs.cube.transform({
				transition: `all ${this.totalDuration}ms ${this.easing}`,
			});

			this.$refs.cube.turnLeft();
		},

		beforeDestroy() {
			if (this.current)
				this.current.show();
		},
	};
</script>
