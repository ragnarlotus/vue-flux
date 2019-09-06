<template>
	<flux-wrapper ref="wrapper" :css="wrapperCss">
		<flux-image
			ref="left"
			:image="from"
			:size="size"
			:css="leftCss"
		/>
		<flux-image
			ref="right"
			:image="to"
			:size="size"
			:css="rightCss"
		/>
	</flux-wrapper>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionSlide',

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
			wrapperCss: {
				width: '200%',
			},
			leftCss: {
				width: '50%',
			},
			rightCss: {
				left: 'auto',
				right: 0,
				width: '50%',
			},
		}),

		played() {
			this.$refs.wrapper.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: `translateX(${-this.size.width}px)`,
			});
		},
	};
</script>
