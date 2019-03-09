<template>
	<div :style="style" ref="display">
		<img v-if="image.src && !image.size" :src="image.src" @load="setImageSize()" @error="setImageSize()" ref="image">
	</div>
</template>

<script>
	import FluxBase from '@/mixins/FluxBase.js';

	export default {
		mixins: [
			FluxBase
		],

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
			}
		}),

		props: {
			css: {
				type: Object,
				default: () => ({
					top: 0,
					left: 0
				})
			}
		},

		methods: {
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

			transform(css) {
				this.$refs.display.clientHeight;

				this.$nextTick(() => {
					this.setCss(css);
					this.$refs.display.clientHeight;
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
