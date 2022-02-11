<template>
	<flux-wrapper
		ref="wrapper"
		:size="wrapperSize"
		:css="wrapperCss"
	>
		<flux-image
			ref="image"
			:image="image"
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
		name: 'TransitionCamera',

		components: {
			FluxWrapper,
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			circles: 2,
			totalDuration: 900,
			easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
			backgroundColor: '#111',
			image: undefined,
			diag: undefined,
			wrapperSize: {},
			wrapperCss: {
				boxSizing: 'border-box',
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				overflow: 'hidden',
				borderRadius: '50%',
			},
			imageCss: {
				alignSelf: 'center',
				flex: 'none',
			},
		}),

		created() {
			this.image = this.from;

			let { width, height } = this.size;
			let diag = this.diag = Math.ceil(Math.sqrt(width * width + height * height));

			this.wrapperSize = {
				width: diag,
				height: diag,
			};

			this.wrapperCss = {
				...this.wrapperCss,
				border: '0 solid '+ this.backgroundColor,
				top: ((height - diag) / 2) +'px',
				left: ((width - diag) / 2) +'px',
			};
		},

		played() {
			this.$refs.wrapper.transform({
				transition: `all ${this.totalDuration / 2 - 50}ms ${this.easing} 0ms`,
				borderWidth: (this.diag / 2) +'px',
			});

			setTimeout(() => {
				this.$refs.image.hide();

				this.$refs.wrapper.transform({
					transition: `all ${this.totalDuration / 2 - 50}ms ${this.easing} 0ms`,
					borderWidth: 0,
				});
			}, this.totalDuration / 2 + 50);
		},
	};
</script>
