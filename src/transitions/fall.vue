<template>
	<flux-image :image="from" :css="imageCss" ref="image"></flux-image>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionFall',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			perspective: '1600px',
			totalDuration: 1600,
			easing: 'ease-in',
			imageCss: {
				transformOrigin: 'center bottom',
			}
		}),

		mounted() {
			this.mask.perspective = this.perspective;
			this.mask.overflow = 'visible';

			this.$refs.image.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: 'rotateX(-90deg)',
			});
		},
	};
</script>
