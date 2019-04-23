<template>
	<flux-wrapper :css="wrapperCss" ref="wrapper">
		<flux-image
			:image="from"
			:size="size"
			:css="imageCss"
			ref="image">
		</flux-image>
	</flux-wrapper>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'transitionSwipe',

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
			wrapperCss: {},
			imageCss: {},
		}),

		created() {
			if (this.direction === 'left') {
				Object.assign(this.wrapperCss, {
					left: 'auto',
					right: 0,
				});

				Object.assign(this.imageCss, {
					left: 'auto',
					right: 0,
					width: this.size.width +'px',
				});
			}
		},

		mounted() {
			this.$refs.wrapper.transform({
				transition: 'width '+ this.totalDuration +'ms '+ this.easing,
				width: 0,
			});
		}
	};
</script>
