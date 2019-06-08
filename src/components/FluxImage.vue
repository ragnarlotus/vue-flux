<template>
	<div :style="style">
		<img v-if="imageSrc && !srcSize" :src="imageSrc" @load="setSrcSize()" @error="setSrcSize()">
	</div>
</template>

<script>
	import DomHelper from '@/libraries/DomHelper.js';

	export default {
		name: 'FluxImage',

		data: () => ({
			mounted: false,
			parent: {},
			srcSize: undefined,
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				zIndex: 'auto',
			},
		}),

		props: {
			size: {
				type: Object,
				default: () => ({}),
			},

			image: [ String, Object ],

			color: {
				type: String,
				default: 'transparent',
			},

			css: {
				type: Object,
				default: () => ({}),
			},

			offset: {
				type: [ Number, String, Object ],
				default: 'auto',
			},
		},

		computed: {
			viewSize() {
				let size = {
					...this.imageFinalSize,
				};

				if (/px$/i.test(this.css.width))
					size.width = parseFloat(this.css.width);

				if (/px$/i.test(this.css.height))
					size.height = parseFloat(this.css.height);

				return size;
			},

			imageSrc() {
				if (!this.image)
					return;

				return this.image.src || this.image;
			},

			imageOriginalSize() {
				if (!this.image)
					return;

				return this.image.size || this.srcSize;
			},

			imageFinalSize() {
				if (this.size.width && this.size.height) {
					return {
						...this.size,
					};
				}

				if (!this.mounted)
					return undefined;

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			sizeStyle() {
				let size = {
					...this.viewSize,
				};

				size.width += 'px';
				size.height += 'px';

				return size;
			},

			colorStyle() {
				return {
					backgroundColor: this.color,
				};
			},

			imageStyle() {
				if (!this.imageSrc) {
					return {
						backgroundImage: 'none',
					};
				}

				let originalSize = this.imageOriginalSize;
				let finalSize = this.imageFinalSize;

				if (!originalSize || !finalSize)
					return {};

				let image = {
					...originalSize,
					top: 0,
					left: 0,
					src: `url("${this.imageSrc}")`,
				};

				if (image.height / image.width >= finalSize.height / finalSize.width) {
					image.height = finalSize.width * image.height / image.width;
					image.width = finalSize.width;
					image.top = (finalSize.height - image.height) / 2;

				} else {
					image.width = finalSize.height * image.width / image.height;
					image.height = finalSize.height;
					image.left = (finalSize.width - image.width) / 2;
				}

				for (let prop of ['width', 'height', 'top', 'left'])
					image[prop] = Math.ceil(image[prop]);

				let offset;

				for (let side of ['top', 'left']) {
					offset = 0;

					if ((this.offset === 'auto' || this.offset[side] === 'auto') && /^[0-9]/.test(this.css[side]))
						offset = '-'+ (this.css[side] || 0);

					else if ((typeof this.offset).includes('string', 'number'))
						offset = this.offset;

					else if (this.offset[side])
						offset = this.offset[side];

					image[side] += parseFloat(offset);
				}

				let position = {
					top: 0,
					left: 0,
				};

				const equalAbs = (val1, val2) => (new RegExp(`^-?${val1}$`)).test(val2);

				if (this.css.top && !equalAbs(this.parent.top, this.css.top))
					position.top = this.css.top;

				if (this.css.left && !equalAbs(this.parent.left, this.css.left))
					position.left = this.css.left;

				return {
					top: position.top,
					left: position.left,
					backgroundImage: image.src,
					backgroundSize: `${image.width}px ${image.height}px`,
					backgroundPosition: `${image.left}px ${image.top}px`,
					backgroundRepeat: this.css.backgroundRepeat || 'no-repeat',
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
					...this.css,
					...this.colorStyle,
					...this.imageStyle,
				};
			},
		},

		mounted() {
			this.mounted = true;

			let parentStyle = this.$el.parentNode.style;

			Object.assign(this.parent, {
				top: parentStyle.top || 0,
				left: parentStyle.left || 0,
			});
		},

		methods: {
			getProperties() {
				return {
					size: this.viewSize,
					image: {
						src: this.imageSrc,
						size: this.imageSize,
					},
				};
			},

			setSrcSize() {
				let img = this.$el.firstChild;

				if (img === undefined)
					return;

				this.srcSize = {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				};
			},

			setCss(css) {
				this.baseStyle = {
					...this.baseStyle,
					...css,
				};
			},

			transform(css) {
				this.$nextTick(() => {
					this.$el.clientHeight;
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
