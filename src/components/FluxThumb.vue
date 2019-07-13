<template>
	<div :style="baseStyle" :title="caption" class="flux-thumb" ref="thumb"></div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxThumb',

		mixins: [
			BaseComponent,
		],

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
			},
		}),

		props: {
			slider: {
				type: Object,
				required: true,
			},

			index: {
				type: Number,
				required: true,
			},
		},

		computed: {
			properties: function() {
				return this.slider.Images.props[this.index];
			},

			caption: function() {
				return this.slider.captions[this.index] || '';
			},
		},

		mounted() {
			this.init();
		},

		methods: {
			init() {
				this.setCss(this.css);

				if (!this.properties)
					return;

				let image = {
					width: this.properties.size.width,
					height: this.properties.size.height,
					src: `url("${this.properties.src}")`,
				};

				let thumb = {
					width: this.$refs.thumb.clientWidth,
					height: this.$refs.thumb.clientHeight,
				};

				this.calcRatioSizes(image, thumb);

				this.setCss({
					backgroundImage: image.src,
					backgroundSize: `${image.width}px ${image.height}px`,
					backgroundPosition: `${image.left}px ${image.top}px`,
					backgroundRepeat: 'no-repeat',
				});
			},
		},
	};
</script>

<style lang="scss">
	$width: 160px;
	$height: 90px;

	.vue-flux .flux-thumb {
		width: $width;
		height: $height;
	}

	@media (max-width: 386px) {
		.vue-flux .flux-thumb {
			width: $width * 0.5;
			height: $height * 0.5;
		}
	}

	@media (min-width: 387px) and (max-width: 576px) {
		.vue-flux .flux-thumb {
			width: $width * 0.7;
			height: $height * 0.7;
		}
	}
</style>
