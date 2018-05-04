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
		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
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
			slider: Object,
			direction: String
		},

		computed: {
			wrapper: function() {
				return this.$refs.wrapper;
			}
		},

		created() {
			this.index.left = this.slider.currentImage.index;
			this.index.right = this.slider.nextImage.index;

			if (this.direction === 'left') {
				this.index.left = this.slider.nextImage.index;
				this.index.right = this.slider.currentImage.index;

				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			this.slider.currentImage.hide();

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
