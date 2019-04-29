<template>
	<div :style="style">
		<img v-if="imageSrc && !srcSize" :src="image.src" @load="setSrcSize()" @error="setSrcSize()">
	</div>
</template>

<script>
	import DomHelper from '@/libraries/DomHelper.js';

	export default {
		name: 'FluxImage',

		data: () => ({
			mounted: false,
			srcSize: undefined,
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				backgroundImage: 'none',
				zIndex: 'auto',
			},
		}),

		props: {
			image: {
				type: [ String, Object ],
				default: () => ({}),
			},

			color: {
				type: String,
				default: () => 'transparent',
			},

			size: {
				type: Object,
				default: () => ({}),
			},

			css: {
				type: Object,
				default: () => ({}),
			},
		},

		computed: {
			viewSize() {
				if (this.size.width && this.size.height)
					return this.size;

				if (!this.mounted)
					return undefined;

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			imageSrc() {
				return this.image.src || this.image;
			},

			imageSize() {
				return this.image.size || this.srcSize;
			},

			sizeStyle() {
				let size = {
					...this.viewSize,
				};

				if (/[0-9]$/.test(size.width))
					size.width += 'px';

				if (/[0-9]$/.test(size.height))
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

				let view = this.viewSize;

				if (!view)
					return {};

				let image = {
					...this.imageSize,
					top: 0,
					left: 0,
					src: 'url("'+ this.imageSrc +'")',
				};

				if (image.height / image.width >= view.height / view.width) {
					image.height = Math.ceil(view.width * image.height / image.width);
					image.width = Math.ceil(view.width);
					image.top = Math.ceil((view.height - image.height) / 2);

				} else {
					image.width = Math.ceil(view.height * image.width / image.height);
					image.height = Math.ceil(view.height);
					image.left = Math.ceil((view.width - image.width) / 2);
				}

				image.top -= parseFloat(this.baseStyle.top);
				image.left -= parseFloat(this.baseStyle.left);

				return {
					top: this.baseStyle.top !== 'auto'? 0 : 'auto',
					left: this.baseStyle.left !== 'auto'? 0 : 'auto',
					backgroundImage: image.src,
					backgroundSize: image.width +'px '+ image.height +'px',
					backgroundPosition: image.left +'px '+ image.top +'px',
					backgroundRepeat: 'no-repeat',
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
					...this.colorStyle,
					...this.imageStyle,
				};
			},
		},

		watch: {
			css() {
				this.setCss(this.css);
			},
		},

		created() {
			this.setCss(this.css);
		},

		mounted() {
			this.mounted = true;
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
