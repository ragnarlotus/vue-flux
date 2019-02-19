<template>
	<flux-cube :slider="slider" :index="index" ref="cube"></flux-cube>
</template>

<script>
	import FluxCube from '@/components/FluxCube.vue';

	let vf, currentImage, nextImage;

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
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			cube: function() {
				return this.$refs.cube;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			vf.Transitions.setOptions(this);

			this.index = {
				front: currentImage.index,
				left: nextImage.index,
				right: nextImage.index
			};
		},

		mounted() {
			vf.mask.style.perspective = this.perspective;

			currentImage.hide();
			nextImage.hide();

			this.cube.setCss({
				transition: 'all '+ this.totalDuration +'ms '+ this.easing
			});

			this.cube.turn(this.direction);
		},

		destroyed() {
			vf.mask.style.perspective = 'none';

			nextImage.show();
		}
	};
</script>
