<template>
	<div :style="style" ref="image">
		<img v-if="src && !imageSize" :src="src" @load="setSize()" @error="setSize()">
	</div>
</template>

<script>
	export default {
		data: () => ({
			style: {},
			imageSrc: undefined,
			imageSize: undefined,
			displaySize: undefined,
			lastInit: 0
		}),

		props: {
			slider: {
				type: Object,
				required: false
			},

			src: {
				type: String,
				required: false
			},

			size: {
				type: Object,
				required: false
			},

			color: {
				type: String,
				required: false
			},

			css: {
				type: Object,
				default: () => {
					return {
						top: 0,
						left: 0
					};
				}
			}
		},

		watch: {
			src: function(newSrc, oldSrc) {
				this.setSrc(newSrc);
			},

			size: function(newSize, oldSize) {
				this.setSize(newSize);
			},

			color: function() {
				this.$nextTick(() => {
					this.init();
				});
			}
		},

		mounted() {
			this.setDisplaySize();

			this.setSrc(this.src);
			this.setSize(this.size);

			this.init(this.lastInit);
		},

		methods: {
			setDisplaySize(size) {
				if (this.slider !== undefined) {
					this.displaySize = this.slider.size;
					return;
				}

				if (size !== undefined) {
					this.displaySize = size;
					return;
				}

				let container = this.$refs.image.parentNode;

				this.displaySize = {
					width: container.clientWidth,
					height: container.clientHeight
				};
			},

			setSrc(src) {
				this.imageSrc = src;
				this.imageSize = undefined;

				let time = this.lastInit = Date.now();

				this.$nextTick(() => {
					this.init(time);
				});
			},

			setSize(size) {
				let img = this.$refs.image.firstChild;

				if (size === undefined && img.tagName !== 'IMG')
					return;

				if (size !== undefined) {
					this.imageSize = size;

				} else if (img.naturalWidth || img.width) {
					this.imageSize = {
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height
					};
				}

				let time = this.lastInit = Date.now();

				this.$nextTick(() => {
					this.init(time);
				});
			},

			init(time) {
				if (this.lastInit !== time)
					return;

				this.setCss({
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
				});

				if (this.color !== undefined) {
					this.setCss({
						backgroundColor: this.color
					});
				}

				if (this.imageSize !== undefined) {
					let container = this.displaySize;

					let image = {
						top: 0,
						left: 0,
						...this.imageSize,
						src: 'url("'+ this.src +'")'
					};

					if (image.height / image.width >= container.height / container.width) {
						image.height = container.width * image.height / image.width;
						image.width = container.width;
						image.top = (container.height - image.height) / 2;

					} else {
						image.width = container.height * image.width / image.height;
						image.height = container.height;
						image.left = (container.width - image.width) / 2;
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
				}
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css
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
