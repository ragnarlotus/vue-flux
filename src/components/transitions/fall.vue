<template>
	<flux-image :slider="slider" :index="currentImage.index" :css="imageCss" ref="image"></flux-image>
</template>

<script>
	import FluxImage from '../FluxImage.vue';

	export default {
		name: 'transitionFall',

		components: {
			FluxImage
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			totalDuration: 1600,
			easing: 'ease-in',
			imageCss: {
				top: 0,
				left: 0,
				transformOrigin: 'center bottom',
				zIndex: 12
			}
		}),

		props: {
			slider: Object
		},

		computed: {
			image: function() {
				return this.$refs.image;
			}
		},

		created() {
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			this.slider.setTransitionOptions(this);
		},

		mounted() {
			this.currentImage.hide();
			this.slider.mask.style.perspective = '1600px';

			this.$nextTick(() => {
				this.image.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateX(-90deg)'
				});
			});
		},

		destroyed() {
			this.nextImage.show();
			this.slider.mask.style.perspective = 'none';
		}
	};
</script>
