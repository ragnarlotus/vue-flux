<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :src="imageSrc" :size="imageSize" ref="image"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionSwipe',

		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
			imageSrc: undefined,
			imageSize: undefined,
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				overflow: 'hidden'
			},
			imageCss: {
				top: 0,
				left: 0
			}
		}),

		props: {
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			wrapper: function() {
				return this.$refs.wrapper;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			this.imageSrc = currentImage.getSrc();
			this.imageSize = currentImage.getSize();

			vf.Transitions.setOptions(this);

			if (this.direction === 'left') {
				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;

				this.imageCss = {
					...this.imageCss,
					left: 'auto',
					right: 0,
					width: vf.size.width +'px'
				}
			}
		},

		mounted() {
			this.wrapper.setCss(this.wrapperCss);

			currentImage.hide();

			this.$nextTick(() => {
				this.$refs.image.setCss(this.imageCss);

				this.wrapper.transform({
					transition: 'width '+ this.totalDuration +'ms '+ this.easing,
					width: 0
				});
			});
		},

		destroyed() {
			nextImage.show();
		}
	};
</script>
