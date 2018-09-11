<template>
	<flux-image :slider="slider" :index="slider.currentImage.index" :css="imageCss" ref="image"></flux-image>
</template>

<script>
	import FluxImage from '../FluxImage.vue';

	export default {
		name: 'transitionFall',

		components: {
			FluxImage
		},

		data: () => ({
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
			this.slider.setTransitionOptions(this);
		},

		mounted() {
			this.slider.currentImage.hide();
			this.slider.mask.style.perspective = '1600px';

			this.$nextTick(() => {
				this.image.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateX(-90deg)'
				});
			});
		},

		destroyed() {
			this.slider.nextImage.show();
			this.slider.mask.style.perspective = 'none';
		}
	};
</script>
