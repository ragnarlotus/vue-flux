<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :index="currentImage.index" ref="image"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '../FluxWrapper.vue';
	import FluxImage from '../FluxImage.vue';

	export default {
		name: 'transitionSwipe',

		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				overflow: 'hidden'
			}
		}),

		props: {
			slider: Object
		},

		computed: {
			wrapper: function() {
				return this.$refs.wrapper;
			}
		},

		created() {
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			this.slider.setTransitionOptions(this);

			if (this.direction === 'left') {
				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			this.wrapper.setCss(this.wrapperCss);

			if (this.direction === 'left') {
				this.$refs.image.setCss({
					left: 'auto',
					right: 0,
					width: this.slider.size.width +'px'
				});
			}

			this.currentImage.hide();

			this.wrapper.transform({
				transition: 'width '+ this.totalDuration +'ms '+ this.easing,
				width: 0
			});
		},

		destroyed() {
			this.nextImage.show();
		}
	};
</script>
