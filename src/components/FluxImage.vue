<template>
	<div :style="style">
		<img
			v-if="imageSrc && !srcSize"
			:src="imageSrc"
			@load="setSrcSize()"
			@error="setSrcSize()" />
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxImage',

		mixins: [
			BaseComponent,
		],

		data: () => ({
			parent: {},
			srcSize: undefined,
			baseStyle: {
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				zIndex: 'auto',
			},
		}),

		props: {
			image: [ String, Object ],

			color: {
				type: String,
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
				let finalSize = this.finalSize;

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

					if ((this.offset === 'auto' || this.offset[side] === 'auto'))
						offset = /^-?[0-9]/.test(this.css[side])? -parseFloat(this.css[side]) : 0;

					else if (typeof this.offset === 'number')
						offset = this.offset;

					else if (this.offset[side])
						offset = this.offset[side];

					image[side] += parseFloat(offset);
				}

				let position = {
					top: 0,
					left: 0,
				};

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
					...this.colorStyle,
					...this.imageStyle,
					...this.css,
				};
			},
		},

		mounted() {
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
