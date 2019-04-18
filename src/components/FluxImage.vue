<template>
	<div :style="style">
		<img v-if="imageSrc && !srcSize" :src="image.src" @load="setSrcSize()" @error="setSrcSize()">
	</div>
</template>

<script>
	import DomHelper from '@/classes/DomHelper.js';

	export default {
		name: 'FluxImage',

		data: () => ({
			srcSize: undefined,
			baseStyle: {
				position: 'absolute',
				overflow: 'hidden',
				backfaceVisibility: 'hidden',
				backgroundImage: 'none',
				zIndex: 'auto',
			},
		}),

		props: {
			size: {
				type: Object,
				default: () => ({}),
			},

			image: {
				type: [ String, Object ],
				default: () => ({}),
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
			viewSize() {
				return this.size || (new DomHelper(this.$el)).size;
			},

			imageSrc() {
				return typeof this.image === 'string'? this.image : this.image.src;
			},

			imageSize() {
				return this.image.size || this.srcSize;
			},

			sizeStyle() {
				return {
					width: this.size.width +'px' || '100%',
					height: this.size.height +'px' || '100%',
				};
			},

			colorStyle() {
				return {
					backgroundColor: this.color,
				};
			},

			imageStyle() {
				if (!this.imageSize) {
					return {
						backgroundImage: 'none',
					};
				}

				let view = this.viewSize;

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

				image.top -= parseFloat(this.css.top);
				image.left -= parseFloat(this.css.left);

				return {
					top: 0,
					left: 0,
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
