<template>
	<flux-vortex :slider="slider" :num-circles="numCircles" :index="index" ref="vortex"></flux-vortex>
</template>

<script>
	import FluxVortex from '../FluxVortex.vue';

	export default {
		name: 'transitionConcentric',

		components: {
			FluxVortex
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			index: undefined,
			numCircles: undefined,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 150,
		}),

		props: {
			slider: Object
		},

		computed: {
			vortex: function() {
				return this.$refs.vortex;
			}
		},

		created() {
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			let size = this.slider.size;
			let diag = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
			let divider = this.slider.size.width / 8;

			this.slider.setTransitionOptions(this, {
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
					transform: 'rotateZ('+ this.getDeg() +'deg)'
				});
			});
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},

			getDeg() {
				return this.direction === 'left'? '-90' : '90';
			}
		}
	};
</script>
