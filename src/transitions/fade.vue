<template>
	<flux-image :image="from" :size="size" :css="imageCss" ref="from" />
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionFade',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1200,
			easing: 'ease-in',
			imageCss: {
				zIndex: 1,
			},
		}),

		mounted() {
			this.$refs.from.transform({
				transition: `opacity ${this.totalDuration}ms ${this.easing}`,
				opacity: 0,
			});
		},
	};
</script>
