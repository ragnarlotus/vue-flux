<template>
	<flux-vortex :slider="slider" :num-circles="numCircles" :index="index" ref="vortex"></flux-vortex>
</template>

<script>
	import FluxVortex from '@/components/FluxVortex.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionCamera',

		components: {
			FluxVortex
		},

		data: () => ({
			index: undefined,
			numCircles: undefined,
			tileDuration: 400,
			totalDuration: 0,
			easing: 'ease',
			tileDelay: 80,
		}),

		props: {
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			vortex: function() {
				return this.$refs.vortex;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			let size = vf.size;
			let diag = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
			let divider = size.width / 8;

			vf.Transitions.setOptions(this, {
				numCircles: Math.ceil(diag / 2 / divider) + 1
			});

			this.totalDuration = this.tileDelay * this.numCircles + this.tileDuration;

			this.index = this.currentImage.index;
		},

		mounted() {
			this.currentImage.hide();

			this.vortex.setCss({
				overflow: 'hidden'
			});

			this.vortex.transform((circle, i) => {
				circle.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: '0',
					transform: 'scale(0, 0)'
				});
			});
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			}
		}
	};
</script>
