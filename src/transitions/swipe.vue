<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :image-src="image.src" :image-size="image.size" ref="image"></flux-image>
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
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				overflow: 'hidden'
			},
			image: {
				src: undefined,
				size: undefined,
				css: {
					top: 0,
					left: 0
				}
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

			this.image = {
				...this.image,
				...currentImage.getImage()
			};

			vf.Transitions.setOptions(this);

			if (this.direction === 'left') {
				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;

				this.image.css = {
					...this.image.css,
					left: 'auto',
					right: 0,
					width: vf.size.width +'px'
				}
			}
		},

		mounted() {
			this.wrapper.setCss(this.wrapperCss);

			currentImage.hide();

			this.$refs.image.setCss(this.image.css);

			this.wrapper.transform({
				transition: 'width '+ this.totalDuration +'ms '+ this.easing,
				width: 0
			});
		},

		destroyed() {
			nextImage.show();
		}
	};
</script>
