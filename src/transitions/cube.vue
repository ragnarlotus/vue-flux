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
			images: {
				front: {},
				right: {},
				left: {},
			},
			totalDuration: 14000,
			perspective: '1600px',
			easing: 'ease-out',
		}),

		created() {
			this.images = {
				front: this.from,
				right: this.to,
				left: this.to,
			};
		},
 
		mounted() {
			this.mask.perspective = this.perspective;
			this.mask.overflow = 'visible';

			this.$refs.cube.transform({
				transition: 'all '+ this.totalDuration +'ms '+ this.easing,
			});

			this.$refs.cube.turnRight();
		},
	};
</script>
