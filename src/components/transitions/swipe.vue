<template>
	<flux-wrapper ref="wrapper">
		<flux-image :slider="slider" :index="slider.currentImage.index" ref="image"></flux-image>
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
				overflow: 'hidden'
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
					width: this.slider.size.width +'px'
				});
			}

			this.slider.currentImage.hide();

			this.wrapper.transform({
				transition: 'width '+ this.totalDuration +'ms '+ this.easing,
				width: 0
			});
		},

		destroyed() {
			this.slider.currentImage.show();
		}
	};
</script>
