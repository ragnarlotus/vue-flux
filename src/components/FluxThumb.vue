<template>
	<div :style="style" :title="caption" class="flux-thumb" ref="thumb"></div>
</template>

<script>
	export default {
		name: 'FluxThumb',

		data: () => ({
			style: {
				overflow: 'hidden',
			},
		}),

		props: {
			slider: {
				type: Object,
				required: true,
			},

			index: {
				type: [Number, String],
				required: true,
			},

			css: {
				type: Object,
				default: () => ({}),
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
					src: 'url("'+ this.properties.src +'")',
				};

				let thumb = {
					width: this.$refs.thumb.clientWidth,
					height: this.$refs.thumb.clientHeight
				};

				if (image.height / image.width >= thumb.height / thumb.width) {
					image.height = thumb.width * image.height / image.width;
					image.width = thumb.width;
					image.top = (thumb.height - image.height) / 2;

				} else {
					image.width = thumb.height * image.width / image.height;
					image.height = thumb.height;
					image.left = (thumb.width - image.width) / 2;
				}

				this.setCss({
					backgroundImage: image.src,
					backgroundSize: image.width +'px '+ image.height +'px',
					backgroundPosition: image.left +'px '+ image.top +'px',
					backgroundRepeat: 'no-repeat',
				});
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
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
