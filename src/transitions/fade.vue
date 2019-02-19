<template></template>

<script>
	let vf, currentImage, nextImage;

	export default {
		name: 'transitionFade',

		data: () => ({
			totalDuration: 1200,
			easing: 'ease-in'
		}),

		props: {
			slider: {
				type: Object,
				required: true
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			vf.Transitions.setOptions(this);
		},

		mounted() {
			currentImage.setCss({
				transition: 'opacity '+ this.totalDuration +'ms '+ this.easing,
				opacity: 0
			});
		},

		destroyed() {
			currentImage.hide();

			currentImage.setCss({
				transition: 'none',
				opacity: 1
			});
		}
	};
</script>
