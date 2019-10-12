<template>
	<flux-wrapper ref="wrapper" :size="size" :css="wrapperCss">
		<flux-image
			ref="image"
			:image="from"
			:size="size"
			:css="imageCss"
		/>
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
			wrapperCss: {
				position: 'absolute',
				top: 0,
				display: 'flex',
				flexWrap: 'nowrap',
			},
			imageCss: {
				flex: '0 0 auto',
			},
		}),

		played() {
			this.$refs.wrapper.transform({
				transition: `width ${this.totalDuration}ms ${this.easing}`,
				width: 0,
			});
		},

		methods: {
			setupPrev() {
				this.wrapperCss = {
					...this.wrapperCss,
					right: 0,
					justifyContent: 'flex-end',
				};
			},

			setupNext() {
				this.wrapperCss = {
					...this.wrapperCss,
					left: 0,
					justifyContent: 'flex-start',
				};
			},
		},
	};
</script>
