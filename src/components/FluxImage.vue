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
			loadSize: undefined,
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				backgroundColor: 'transparent',
				backgroundImage: 'none',
				zIndex: 'auto',
			},
		}),

		props: {
			displaySize: {
				type: Object,
				required: false,
			},

			image: {
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
				default: () => 'transparent',
			},

			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0,
				}),
			},
		},

		computed: {
			display: function() {
				return this.displaySize || DisplayController.getSizeFrom(this.$el);
			},

			src: function() {
				if (this.image && this.image.src)
					return this.image.src;

				if (this.imageSrc)
					return this.imageSrc;

				return undefined;
			},

			size: function() {
				if (this.image && this.image.size)
					return this.image.size;

				if (this.imageSize)
					return this.imageSize;

				if (this.loadSize)
					return this.loadSize;

				return undefined;
			},

			style: function() {
				return {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					backfaceVisibility: 'hidden',
					backgroundColor: this.color,
					backgroundImage: 'none',
					zIndex: 'auto',
				};
			}
		}

		created() {
			this.setCss(this.css);
		},

		mounted() {
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
					...size,
				};

				this.init();
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
					src: 'url("'+ this.src +'")',
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
					backgroundRepeat: 'no-repeat',
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
			},
		},
	};
</script>

<style lang="scss" scoped>
	img {
		position: absolute;
		visibility: hidden;
	}
</style>
