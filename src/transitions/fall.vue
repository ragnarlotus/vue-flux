<template>
	<flux-image
		ref="image"
		:image="from"
		:css="imageCss"
	/>
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
			totalDuration: 1600,
			easing: 'ease-in',
			imageCss: {
				transformOrigin: 'center bottom',
			}
		}),

		mounted() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});
		},

		played() {
			this.$refs.image.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: 'rotateX(-90deg)',
			});
		},
	};
</script>
