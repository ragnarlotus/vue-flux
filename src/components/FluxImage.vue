<template>
	<div :style="style" ref="image">
		<img v-if="src && !size" :src="src" @load="setImageSize()" @error="setImageSize()">
	</div>
</template>

<script>
	import DisplayController from '@/controllers/Display.js';

	export default {
		name: 'FluxImage',

		data: () => ({
			display: undefined,
			src: undefined,
			size: undefined,
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
			}
		}),

		props: {
			slider: {
				type: Object,
				required: false,
			},

			displaySize: {
				type: Object,
				required: false,
			},

			imageSrc: {
				type: String,
				required: false,
			},

			imageSize: {
				type: Object,
				required: false,
			},

			color: {
				type: String,
				required: false,
			},

			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0
				})
			},
		},

		watch: {
			displaySize: function(newSize, oldSize) {
				this.display.setSize(newSize);
			},

			imageSrc: function(newSrc, oldSrc) {
				this.setImageSrc(newSrc);
			},

			imageSize: function(newSize, oldSize) {
				this.setImageSize(newSize);
			},

			color: function() {
				this.setColor(this.color);
			}
		},

		created() {
			this.setCss(this.css);
		},

		mounted() {
			this.display = new DisplayController(this);

			if (this.slider)
				this.display.setSize(this.slider.size);

			else if (this.displaySize)
				this.display.setSize(this.displaySize);

			else
				this.display.setSizeFrom(this.$refs.image);

			if (this.imageSrc)
				this.setImageSrc(this.imageSrc);

			if (this.imageSize)
				this.setImageSize(this.imageSize);

			if (this.color)
				this.setColor(this.color);
		},

		methods: {
			getImageSrc() {
				return this.src;
			},

			setImageSrc(src) {
				this.src = src;
				this.size = this.imageSize;

				this.init();
			},

			getImageSize() {
				return this.size;
			},

			setImageSize(size) {
				if (size === undefined) {
					let img = this.$refs.image.firstChild;

					if (img === undefined)
						return;

					size = {
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height,
					};
				}

				this.size = {
					...this.size,
					...size
				};

				this.init();
			},

			getColor() {
				return this.style.backgroundColor;
			},

			setColor(color) {
				this.style.backgroundColor = color;
			},

			getProperties() {
				return {
					src: this.src,
					size: this.size,
				};
			},

			init() {
				if (this.size === undefined)
					return;

				let display = this.display.size;

				let image = {
					top: 0,
					left: 0,
					...this.size,
					src: 'url("'+ this.src +'")'
				};

				if (image.height / image.width >= display.height / display.width) {
					image.height = Math.ceil(display.width * image.height / image.width);
					image.width = Math.ceil(display.width);
					image.top = Math.ceil((display.height - image.height) / 2);

				} else {
					image.width = Math.ceil(display.height * image.width / image.height);
					image.height = Math.ceil(display.height);
					image.left = Math.ceil((display.width - image.width) / 2);
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
					...css,
				};
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

<style lang="scss" scoped>
	img {
		position: absolute;
		visibility: hidden;
	}
</style>
