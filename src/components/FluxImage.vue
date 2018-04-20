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
				overflow: 'hidden'
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

		computed: {
			properties: function() {
				return this.slider.properties[this.index];
			}
		},

		watch: {
			index: function(newIndex, oldIndex) {
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
				let image = {
					top: 0,
					left: 0,
					width: this.properties.width,
					height: this.properties.height,
					src: this.slider.background.image +'url("'+ this.properties.src +'")'
				};

				if (image.width / image.height > this.slider.size.width / this.slider.size.height) {
					if (image.width > this.slider.size.width) {
						image.width = this.slider.size.width;
						image.height = Math.ceil(this.slider.size.width / this.properties.width * image.height);

					} else {
						image.left = Math.floor((this.slider.size.width - image.width) / 2);
					}

					image.top = Math.floor((this.slider.size.height - image.height) / 2);

				} else {
					if (image.height > this.slider.size.height) {
						image.height = this.slider.size.height;
						image.width = Math.ceil(this.slider.size.height / this.properties.height * image.width);

					} else {
						image.top = Math.floor((this.slider.size.height - image.height) / 2);
					}

					image.left = Math.floor((this.slider.size.width - image.width) / 2);
				}

				image.top -= parseInt(this.css.top);
				image.left -= parseInt(this.css.left);

				this.setCss({
					top: 0,
					left: 0,
					backgroundColor: this.slider.background.color,
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
				this.$refs.image.clientHeight;

				this.$nextTick(() => {
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
