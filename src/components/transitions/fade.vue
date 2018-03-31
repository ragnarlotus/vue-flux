<template></template>

<script>
	export default {
		data: () => ({
			duration: 1200,
			easing: 'ease-in'
		}),

		methods: {
			run(slider) {
				Object.assign(slider.frontImage.style, {
					transition: 'opacity '+ this.duration +'ms '+ this.easing,
					opacity: 0
				});

				return this.duration;
			},

			reset(slider) {
				Object.assign(slider.rearImage.style, {
					transition: 'none',
					opacity: 1
				});
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
