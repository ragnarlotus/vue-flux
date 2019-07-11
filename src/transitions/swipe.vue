<template>
	<flux-wrapper ref="wrapper">
		<flux-image
			:image="from"
			:size="size"
			ref="image">
		</flux-image>
	</flux-wrapper>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionSwipe',

		components: {
			FluxWrapper,
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1400,
			easing: 'ease-in-out',
		}),

		mounted() {
			this.$refs.wrapper.transform({
				transition: `width ${this.totalDuration}ms ${this.easing}`,
				width: 0,
			});
		}
	};
</script>
