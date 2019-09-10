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
			srcSize: undefined,
			baseStyle: {
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				zIndex: 'auto',
			},
		}),

		props: {
			image: [ String, Object ],

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
				if (this.rendered) {
					return {
						backgroundColor: this.color,
					};
				};

				return {};
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

				['width', 'height'].forEach(prop => {
					image[prop] = Math.ceil(image[prop]);
				});

				['top', 'left'].forEach(side => {
					image[side] = Math.round(image[side]);

					let offset = 0;

					if ((this.offset === 'auto' || this.offset[side] === 'auto'))
						offset = /^-?[0-9]/.test(this.css[side])? -parseFloat(this.css[side]) : 0;

					else if (typeof this.offset === 'number')
						offset = this.offset;

					else if (this.offset[side])
						offset = this.offset[side];

					image[side] += parseFloat(offset);
				});

				return {
					top: 0,
					left: 0,
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
