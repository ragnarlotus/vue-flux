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
		name: 'transitionBook',

		components: {
			FluxCube,
			FluxImage
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			totalDuration: 1200,
			easing: 'ease-out',
			pageWidth: 0,
			cubeCss: {
				top: 0,
				left: 0,
				width: 0,
				transformOrigin: 'left center',
				zIndex: 13
			},
			imageCss: {
				top: 0,
				left: 0,
				width: 0,
				zIndex: 12
			},
			index: {
				front: undefined,
				back: undefined
			}
		}),

		props: {
			slider: Object
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
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			this.slider.setTransitionOptions(this);

			this.pageWidth = this.slider.size.width / 2;

			this.imageCss.width = Math.ceil(this.pageWidth) +'px';
			this.cubeCss.width = Math.ceil(this.pageWidth) +'px';

			if (this.direction !== 'left') {
				this.cubeCss.left = Math.ceil(this.pageWidth) +'px';
				this.imageCss.left = Math.ceil(this.pageWidth) +'px';
			}

			this.index.front = this.currentImage.index;
			this.index.back = this.nextImage.index;
		},

		mounted() {
			this.setCubeCss();
			this.setCubeBackCss();
			this.setImageCss();

			this.slider.mask.style.perspective = '1600px';

			this.$nextTick(() => {
				this.cube.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateY('+ this.getDeg() +'deg)'
				});
			});
		},

		destroyed() {
			this.slider.mask.style.perspective = 'none';
		},

		methods: {
			setCubeCss() {
				if (this.direction === 'left') {
					this.cube.setCss({
						transformOrigin: 'right center'
					});
				}
			},

			setCubeBackCss() {
				let [backgroundPositionX] = this.cube.back.style.backgroundPosition.split(' ');
				backgroundPositionX = parseFloat(backgroundPositionX);

				if (this.direction !== 'left')
					backgroundPositionX += this.pageWidth;

				else
					backgroundPositionX -= this.pageWidth;

				this.cube.back.setCss({
					backgroundPositionX: backgroundPositionX +'px'
				});
			},

			setImageCss() {
				if (this.direction !== 'left') { 
					this.image.setCss({
						left: Math.ceil(this.pageWidth) +'px'
					});
				}
			},

			getDeg() {
				return this.direction !== 'left'? '-180' : '180';
			}
		}
	};
</script>
