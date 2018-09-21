<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :index="index.left" ref="imageLeft"></flux-image>
		<flux-image :slider="slider" :index="index.right" ref="imageRight"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '../FluxWrapper.vue';
	import FluxImage from '../FluxImage.vue';

	export default {
		name: 'transitionSlide',

		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
			currentImage: undefined,
			nextImage: undefined,
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				width: '200%'
			},
			index: {
				left: undefined,
				right: undefined
			}
		}),

		props: {
			slider: Object
		},

		computed: {
			wrapper: function() {
				return this.$refs.wrapper;
			}
		},

		created() {
			this.currentImage = this.slider.currentImage();
			this.nextImage = this.slider.nextImage();

			this.slider.setTransitionOptions(this);

			this.index.left = this.currentImage.index;
			this.index.right = this.nextImage.index;

			if (this.direction === 'left') {
				this.index.left = this.nextImage.index;
				this.index.right = this.currentImage.index;

				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			this.currentImage.hide();

			this.slider.mask.style.overflow = 'hidden';

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
			this.slider.mask.style.overflow = 'visible';
		},

		methods: {
			getTx() {
				let tx = -this.slider.size.width;

				if (this.direction === 'left')
					tx = Math.abs(tx);

				return tx;
			}
		}
	};
</script>
