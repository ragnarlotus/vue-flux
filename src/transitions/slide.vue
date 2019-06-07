<template>
	<flux-wrapper :css="wrapperCss" ref="wrapper">
		<flux-image :image="from" :size="size" :css="leftCss" ref="left"></flux-image>
		<flux-image :image="to" :size="size" :css="rightCss" ref="right"></flux-image>
	</flux-wrapper>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'transitionSlide',

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

		mounted() {
			this.$refs.wrapper.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: `translateX(${-this.size.width}px)`,
			});
		},
	};
</script>
