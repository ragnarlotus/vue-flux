<template>
	<div>
		<flux-cube :slider="slider" :index="index" :css="cubeCss" ref="cube"></flux-cube>
		<flux-image :slider="slider" :index="index.back" :css="imageCss" ref="image"></flux-image>
	</div>
</template>

<script>
	import FluxCube from '../FluxCube.vue';
	import FluxImage from '../FluxImage.vue';

	export default {
		components: {
			FluxCube,
			FluxImage
		},

		data: () => ({
			totalDuration: 1200,
			easing: 'ease-out',
			cubeCss: {
				top: 0,
				left: 0,
				width: '50%',
				zIndex: 13
			},
			imageCss: {
				top: 0,
				left: 0,
				width: '50%',
				zIndex: 12
			},
			index: {
				front: undefined,
				back: undefined
			}
		}),

		props: {
			slider: Object,
			direction: String
		},

		computed: {
			cube: function() {
				return this.$refs.cube;
			},

			image: function() {
				return this.$refs.image;
			}
		},

		created() {
			if (this.direction !== 'left') {
				this.cubeCss.left = Math.ceil(this.slider.size.width / 2) +'px';
				this.imageCss.left = this.cubeCss.left;
			}

			this.index.front = this.slider.currentImage.index;
			this.index.back = this.slider.nextImage.index;
		},

		mounted() {
			this.cube.setCss(this.getCubeCss());
			this.cube.front.setCss(this.getFrontCss());
			this.cube.back.setCss(this.getBackCss());
			this.image.setCss(this.getImageCss());

			this.slider.mask.style.perspective = '1600px';

			this.cube.transform({
				transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
				transform: 'rotateY('+ this.getDeg() +'deg)'
			});
		},

		destroyed() {
			this.slider.mask.style.perspective = 'none';
		},

		methods: {
			getCubeCss() {
				let css = {};

				if (this.direction === 'left') {
					Object.assign(css, {
						transformOrigin: 'right center'
					});

				} else {
					Object.assign(css, {
						left: '50%',
						transformOrigin: 'left center'
					});
				}

				return css;
			},

			getFrontCss() {
				let css = {};

				if (this.direction === 'left')
					css.backgroundPosition = '0 0';

				return css;
			},

			getBackCss() {
				let css = {};

				if (this.direction === 'left')
					css.backgroundPosition = '-'+ Math.ceil(this.slider.size.width / 2) +'px 0';

				else
					css.backgroundPosition = '0 0';

				return css;
			},

			getImageCss() {
				let css = {};

				if (this.direction !== 'left') {
					Object.assign(css, {
						left: '50%'
					});
				}

				return css;
			},

			getDeg() {
				return this.direction === 'left'? '179' : '-179';
			}
		}
	};
</script>
