<template>
	<div :style="style"></div>
</template>

<script>
	export default {
		data: () => ({
			index: undefined,
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				transition: 'none',
				opacity: 1,
				visibility: 'visible',
				perspective: 'none',
				transform: 'none'
			}
		}),

		props: {
			slider: Object
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

		methods: {
			init() {
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

				image.top -= parseInt(this.style.top);
				image.left -= parseInt(this.style.left);

				this.style = Object.assign({}, this.style, {
					'background-color': this.slider.background.color,
					'background-image': image.src,
					'background-size': image.width +'px '+ image.height +'px',
					'background-position': image.left +'px '+ image.top +'px',
					'background-repeat': 'no-repeat'
				});
			},

			css(css) {
				this.style = Object.assign({}, this.style, css);
			},

			show() {
				this.style.visibility = 'visible';
			},

			hide() {
				this.style.visibility = 'hidden';
			}
		}
	};
</script>
