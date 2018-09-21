<template>
	<div :style="style" ref="image"></div>
</template>

<script>
	export default {
		data: () => ({
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				zIndex: 'auto'
			}
		}),

		props: {
			slider: {
				type: Object,
				required: true
			},
			index: {
				type: [Number, String],
				required: true
			},
			css: {
				type: Object,
				default: () => {
					return {
						top: 0,
						left: 0
					};
				}
			}
		},

		watch: {
			index: function() {
				this.init();
			}
		},

		created() {
			this.init();
		},

		methods: {
			init() {
				this.setCss(this.css);

				if (typeof this.index === 'number')
					this.initImage();

				else if (/^#/.test(this.index))
					this.initColor();
			},

			initColor() {
				this.setCss({
					backgroundColor: this.index
				});
			},

			initImage() {
				let properties = this.slider.properties[this.index];

				if (!properties) {
					this.setCss({
						backgroundColor: 'transparent',
						backgroundImage: 'none'
					});

					return;
				}

				let image = {
					top: 0,
					left: 0,
					width: properties.width,
					height: properties.height,
					src: 'url("'+ properties.src +'")'
				};

				if (image.height / image.width >= this.slider.size.height / this.slider.size.width) {
					image.height = Math.ceil(this.slider.size.width * image.height / image.width);
					image.width = Math.ceil(this.slider.size.width);
					image.top = Math.ceil((this.slider.size.height - image.height) / 2);

				} else {
					image.width = Math.ceil(this.slider.size.height * image.width / image.height);
					image.height = Math.ceil(this.slider.size.height);
					image.left = Math.ceil((this.slider.size.width - image.width) / 2);
				}

				image.top -= parseFloat(this.css.top);
				image.left -= parseFloat(this.css.left);

				this.setCss({
					top: 0,
					left: 0,
					backgroundImage: image.src,
					backgroundSize: image.width +'px '+ image.height +'px',
					backgroundPosition: image.left +'px '+ image.top +'px',
					backgroundRepeat: 'no-repeat'
				});
			},

			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			transform(css) {
				this.$nextTick(() => {
					this.$refs.image.clientHeight;
					this.setCss(css);
				});
			},

			show() {
				this.setCss({
					visibility: 'visible'
				});
			},

			hide() {
				this.setCss({
					visibility: 'hidden'
				});
			}
		}
	};
</script>
