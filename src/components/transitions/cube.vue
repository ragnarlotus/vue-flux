<template>
	<flux-cube :slider="slider" :index="index" ref="cube"></flux-cube>
</template>

<script>
	import FluxCube from '../FluxCube.vue';

	export default {
		name: 'transitionCube',

		components: {
			FluxCube
		},

		data: () => ({
			index: {},
			totalDuration: 1400,
			perspective: '1600px',
			easing: 'ease-out'
		}),

		props: {
			slider: Object
		},

		computed: {
			cube: function() {
				return this.$refs.cube;
			}
		},

		created() {
			this.slider.setTransitionOptions(this);

			this.index = {
				front: this.slider.currentImage.index,
				left: this.slider.nextImage.index,
				right: this.slider.nextImage.index
			};
		},

		mounted() {
			this.slider.mask.style.perspective = this.perspective;

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
