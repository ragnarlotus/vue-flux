<template>
	<flux-wrapper ref="wrapper" :size="wrapperSize">
		<flux-image
			ref="left"
			:image="from"
			:size="size"
		/>
		<flux-image
			ref="right"
			:image="to"
			:size="size"
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
			wrapperSize: null,
		}),

		created() {
			this.wrapperSize = {
				width: this.size.width * 2,
				height: this.size.height,
			};
		},

		played() {
			this.$refs.wrapper.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: `translateX(${-this.size.width}px)`,
			});
		},
	};
</script>
