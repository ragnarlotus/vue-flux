<template>
	<flux-vortex :slider="slider" :num-circles="numCircles" :index="index" ref="vortex"></flux-vortex>
</template>

<script>
	import FluxVortex from '@/components/FluxVortex.vue';

	let vf, currentImage;

	export default {
		name: 'transitionWarp',

		components: {
			FluxVortex
		},

		data: () => ({
			index: undefined,
			numCircles: undefined,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 150,
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

			let size = vf.size;
			let diag = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
			let divider = size.width / 8;

			vf.Transitions.setOptions(this, {
				numCircles: Math.ceil(diag / 2 / divider) + 1
			});

			this.totalDuration = this.tileDelay * this.numCircles + this.tileDuration;

			this.index = currentImage.index;
		},

		mounted() {
			currentImage.hide();

			this.vortex.setCss({
				overflow: 'hidden'
			});

			this.vortex.transform((circle, i) => {
				circle.transform({
					transition: 'all '+ this.tileDuration +'ms '+ this.easing +' '+ this.getDelay(i) +'ms',
					opacity: '0',
					transform: 'rotateZ('+ this.getDeg(i) +'deg)'
				});
			});
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},

			getDeg(i) {
				return i % 2 === 0? '-90' : '90';
			}
		}
	};
</script>
