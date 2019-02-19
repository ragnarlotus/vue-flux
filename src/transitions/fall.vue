<template>
	<flux-image :slider="slider" :index="currentImage.index" :css="imageCss" ref="image"></flux-image>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';

	let vf, currentImage, nextImage;

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
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			image: function() {
				return this.$refs.image;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			vf.Transitions.setOptions(this);
		},

		mounted() {
			this.currentImage.hide();
			vf.mask.style.perspective = '1600px';

			this.$nextTick(() => {
				this.image.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateX(-90deg)'
				});
			});
		},

		destroyed() {
			nextImage.show();
			vf.mask.style.perspective = 'none';
		}
	};
</script>
