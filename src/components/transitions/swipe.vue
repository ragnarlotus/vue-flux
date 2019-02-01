<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :src="src" :size="size" ref="image"></flux-image>
	</flux-wrapper>
</template>

<script>
	import FluxWrapper from '../FluxWrapper.vue';
	import FluxImage from '../FluxImage.vue';

	let vf, currentImage, nextImage;

	export default {
		name: 'transitionSwipe',

		components: {
			FluxWrapper,
			FluxImage
		},

		data: () => ({
			src: undefined,
			size: undefined,
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				overflow: 'hidden'
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

			let props = vf.Images.props[currentImage.index];

			this.src = props.src;

			this.size = {
				width: props.width,
				height: props.height
			};

			vf.Transitions.setOptions(this);

			if (this.direction === 'left') {
				this.wrapperCss.left = 'auto';
				this.wrapperCss.right = 0;
			}
		},

		mounted() {
			this.wrapper.setCss(this.wrapperCss);

			if (this.direction === 'left') {
				this.$refs.image.setCss({
					left: 'auto',
					right: 0,
					width: vf.size.width +'px'
				});
			}

			currentImage.hide();

			this.wrapper.transform({
				transition: 'width '+ this.totalDuration +'ms '+ this.easing,
				width: 0
			});
		},

		destroyed() {
			nextImage.show();
		}
	};
</script>
