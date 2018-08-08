<template>
	<div :style="style" :title="caption(index)"></div>
</template>

<script>
	export default {
		data: () => ({
			style: {
				width: '160px',
				height: '90px',
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
					return {};
				}
			}
		},

		computed: {
			properties: function() {
				return this.slider.properties[this.index];
			}
		},

		created() {
			this.init();
		},

		methods: {
			init() {
				this.setCss(this.css);

				if (!this.properties)
					return;

				let image = {
					width: this.properties.width,
					height: this.properties.height,
					src: 'url("'+ this.properties.src +'")'
				};

				let thumb = {
					width: parseInt(this.style.width),
					height: parseInt(this.style.height)
				};

				if (image.height / image.width >= thumb.height / thumb.width) {
					image.height = Math.ceil(thumb.width * image.height / image.width);
					image.width = thumb.width;
					image.top = Math.floor((thumb.height - image.height) / 2);

				} else {
					image.width = Math.ceil(thumb.height * image.width / image.height);
					image.height = thumb.height;
					image.left = Math.floor((thumb.width - image.width) / 2);
				}

				this.setCss({
					backgroundImage: image.src,
					backgroundSize: image.width +'px '+ image.height +'px',
					backgroundPosition: image.left +'px '+ image.top +'px',
					backgroundRepeat: 'no-repeat'
				});
			},

			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			caption(index) {
				return this.slider.captions[this.index] || '';
			}
		}
	};
</script>
