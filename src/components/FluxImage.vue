<template>
	<div :style="style" ref="display">
		<img v-if="image.src && !image.size" :src="image.src" @load="setImageSize()" @error="setImageSize()" ref="image">
	</div>
</template>

<script>
	import DomMan from '@/classes/DomMan.js';

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
				backgroundColor: 'transparent',
				backgroundImage: 'none',
				zIndex: 'auto'
			},
			display: {
				size: undefined
			},
			image: {
				src: undefined,
				size: undefined
			},
		}),

		props: {
			slider: {
				type: Object,
				required: false
			},

			displaySize: {
				type: Object,
				required: false
			},

			imageSrc: {
				type: String,
				required: false
			},

			imageSize: {
				type: Object,
				required: false
			},

			color: {
				type: String,
				required: false
			},

			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0
				})
			}
		},

		watch: {
			displaySize: function(newSize, oldSize) {
				this.setDisplaySize(newSize);
			},

			imageSrc: function(newSrc, oldSrc) {
				this.setSrc(newSrc);
			},

			imageSize: function(newSize, oldSize) {
				this.setDisplaySize(newSize);
			},

			color: function() {
				this.setColor(this.color);
			}
		},

		mounted() {
			this.setDisplaySize();

			if (this.imageSrc)
				this.setImageSrc(this.imageSrc);

			if (this.imageSize)
				this.setImageSize(this.imageSize);
		},

		methods: {
			getDisplaySize() {
				return this.display.size;
			},

			setDisplaySize(size) {
				if (size !== undefined) {
					this.display.size = size;
					return;
				}

				if (this.slider !== undefined) {
					this.display.size = this.slider.size;
					return;
				}

				let container = new DomMan(this.$refs.display.parentNode);

				this.display.size = container.getSize();
			},

			getImageSrc() {
				return this.image.src;
			},

			setImageSrc(src) {
				this.image.src = src;
				this.image.size = undefined;

				this.init();
			},

			getImageSize() {
				return this.image.size;
			},

			setImageSize(size) {
				let img = this.$refs.image;

				if (size !== undefined) {
					this.image.size = size;

				} else if (img.naturalWidth || img.width) {
					this.image.size = {
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height
					};
				}

				this.init();
			},

			getImageProperties() {
				return this.image;
			},

			getColor() {
				return this.style.backgroundColor;
			},

			setColor(color) {
				this.style.backgroundColor = color;
			},

			init() {
				if (this.image.size === undefined)
					return;

				let display = this.display.size;

				let image = {
					top: 0,
					left: 0,
					...this.image.size,
					src: 'url("'+ this.image.src +'")'
				};

				if (image.height / image.width >= display.height / display.width) {
					image.height = display.width * image.height / image.width;
					image.width = display.width;
					image.top = (display.height - image.height) / 2;

				} else {
					image.width = display.height * image.width / image.height;
					image.height = display.height;
					image.left = (display.width - image.width) / 2;
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
				this.style = {
					...this.style,
					...css
				};
			},

			transform(css) {
				this.$refs.display.clientHeight;

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

<style lang="scss" scoped>
	img {
		position: absolute;
		visibility: hidden;
	}
</style>
