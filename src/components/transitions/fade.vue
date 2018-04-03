<template></template>

<script>
	export default {
		data: () => ({
			totalDuration: 1200,
			easing: 'ease-in'
		}),

		props: {
			slider: Object
		},

		mounted() {
			this.slider.currentImage.css({
				transition: 'opacity '+ this.totalDuration +'ms '+ this.easing,
				opacity: 0
			});
		},

		destroyed() {
			this.slider.nextImage.css({
				transition: 'none',
				opacity: 1
			});
		}
	};
</script>
