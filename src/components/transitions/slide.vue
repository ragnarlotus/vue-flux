<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :index="index.left" ref="imageLeft"></flux-image>
		<flux-image :slider="slider" :index="index.right" ref="imageRight"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '../FluxWrapper.vue';
	import FluxImage from '../FluxImage.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionSlide',

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

			this.index.left = currentImage.index;
			this.index.right = nextImage.index;

			if (this.direction === 'left') {
				this.index.left = nextImage.index;
				this.index.right = currentImage.index;

				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			this.currentImage.hide();

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
