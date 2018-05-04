<template>
	<flux-cube :slider="slider" :index="index" ref="cube"></flux-cube>
</template>

<script>
	import FluxCube from '../FluxCube.vue';

	export default {
		components: {
			FluxCube
		},

		data: () => ({
			index: {},
			totalDuration: 1400,
			easing: 'ease-out'
		}),

		props: {
			slider: Object,
			direction: String
		},

		computed: {
			cube: function() {
				return this.$refs.cube;
			}
		},

		created() {
			this.index = {
				front: this.slider.currentImage.index,
				left: this.slider.nextImage.index,
				right: this.slider.nextImage.index
			};
		},

		mounted() {
			this.slider.mask.style.perspective = '1600px';

			this.slider.currentImage.hide();
			this.slider.nextImage.hide();

			this.cube.setCss({
				transition: 'all '+ this.totalDuration +'ms '+ this.easing
			});

			this.cube.turn(this.direction);
		},

		destroyed() {
			this.slider.mask.style.perspective = 'none';

			this.slider.currentImage.show();
		}
	};
</script>
