<template>
	<flux-wrapper :css="wrapperCss" ref="wrapper">
		<flux-image :image="from" :size="size" ref="left"></flux-image>
		<flux-image :image="to" :size="size" ref="right"></flux-image>
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
		}),

		mounted() {
			this.$refs.left.setCss({
				width: '50%',
			});

			this.$refs.right.setCss({
				left: 'auto',
				right: 0,
				width: '50%',
			});

			this.$refs.wrapper.transform({
				transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
				transform: 'translateX('+ -this.size.width +'px)',
			});
		},
	};
</script>
