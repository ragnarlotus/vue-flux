<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :image-src="images.left.src" :image-size="images.left.size" ref="imageLeft"></flux-image>
		<flux-image :slider="slider" :image-src="images.right.src" :image-size="images.right.size" ref="imageRight"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionSlide',

		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
			totalDuration: 140000,
			easing: 'ease-in-out',
			wrapperCss: {
				width: '200%'
			},
			images: {
				left: undefined,
				right: undefined
			}
		}),

		props: {
			slider: {
				type: Object,
				required: true
			}
		},

		computed: {
			wrapper: function() {
				return this.$refs.wrapper;
			}
		},

		created() {
			vf = this.slider;
			currentImage = vf.Images.current;
			nextImage = vf.Images.next;

			vf.Transitions.setOptions(this);

			this.images.left = currentImage.getImageProperties();
			this.images.right = nextImage.getImageProperties();

			if (this.direction === 'left') {
				this.images.left = nextImage.getImageProperties();
				this.images.right = currentImage.getImageProperties();

				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			currentImage.hide();

			vf.mask.style.overflow = 'hidden';

			this.wrapper.setCss(this.wrapperCss);

			this.$refs.imageLeft.setCss({
				width: '50%'
			});

			this.$refs.imageRight.setCss({
				left: 'auto',
				right: 0,
				width: '50%'
			});

			this.wrapper.transform({
				transition: 'transform '+ this.totalDuration +'ms '+ this.easing,
				transform: 'translateX('+ this.getTx() +'px)'
			});
		},

		destroyed() {
			vf.mask.style.overflow = 'visible';
		},

		methods: {
			getTx() {
				let tx = -vf.size.width;

				if (this.direction === 'left')
					tx = Math.abs(tx);

				return tx;
			}
		}
	};
</script>
