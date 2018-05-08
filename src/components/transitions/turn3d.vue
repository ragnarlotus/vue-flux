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
			pageWidth: 0,
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
			this.pageWidth = Math.ceil(this.slider.size.width / 2);

			if (this.direction !== 'left') {
				this.cubeCss.left = this.pageWidth +'px';
				this.imageCss.left = this.cubeCss.left;
			}

			this.index.front = this.slider.currentImage.index;
			this.index.back = this.slider.nextImage.index;
		},

		mounted() {
			this.cube.setCss(this.getCubeCss());
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
			getBackgroundPosition(side) {
				let x, y;

				[ x, y ] = side.style.backgroundPosition.split(' ');

				x = parseInt(x);
				y = parseInt(y);

				return { x, y };
			},

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

			getBackCss() {
				let backgroundPosition = this.getBackgroundPosition(this.cube.back);

				if (this.direction === 'left')
					backgroundPosition.x -= this.pageWidth;

				else
					backgroundPosition.x += this.pageWidth;

				return {
					backgroundPosition: backgroundPosition.x +'px '+ backgroundPosition.y +'px'
				};
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
