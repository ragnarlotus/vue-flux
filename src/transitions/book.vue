<template>
	<div>
		<flux-cube :slider="slider" :index="index" :css="cubeCss" ref="cube"></flux-cube>
		<flux-image :slider="slider" :index="index.back" :css="imageCss" ref="image"></flux-image>
	</div>
</template>

<script>
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionBook',

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
			slider: {
				type: Object,
				required: true
			}
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
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			vf.Transitions.setOptions(this);

			this.pageWidth = vf.size.width / 2;

			this.imageCss.width = Math.ceil(this.pageWidth) +'px';
			this.cubeCss.width = Math.ceil(this.pageWidth) +'px';

			if (this.direction !== 'left') {
				this.cubeCss.left = Math.ceil(this.pageWidth) +'px';
				this.imageCss.left = Math.ceil(this.pageWidth) +'px';
			}

			this.index.front = currentImage.index;
			this.index.back = nextImage.index;
		},

		mounted() {
			this.setCubeCss();
			this.setCubeBackCss();
			this.setImageCss();

			vf.mask.style.perspective = '1600px';

			this.$nextTick(() => {
				this.cube.transform({
					transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
					transform: 'rotateY('+ this.getDeg() +'deg)'
				});
			});
		},

		destroyed() {
			vf.mask.style.perspective = 'none';
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
