<template>
	<div :style="style" ref="vortex">
		<flux-image
			v-for="i in numCircles"
			:key="i"
			:slider="slider"
			:display-size="displaySize"
			:image-src="imageSrc"
			:image-size="imageSize"
			:css="getTileCss(i)"
			ref="tiles">
		</flux-image>
	</div>
</template>

<script>
	import DisplayController from '@/controllers/Display.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxVortex',

		components: {
			FluxImage
		},

		data: () => ({
			display: undefined,
			diag: undefined,
			radius: undefined,
			tile: {
				top: undefined,
				left: undefined
			},
			style: {
				position: 'absolute',
				width: '100%',
				height: '100%',
				zIndex: '12'
			}
		}),

		props: {
			numCircles: {
				type: Number,
				default: 1
			},

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

		computed: {
			tiles: function() {
				return this.$refs.tiles;
			}
		},

		created() {
			this.display = new DisplayController(this);

			if (this.slider)
				this.display.setSize(this.slider.size);

			else if (this.displaySize)
				this.display.setSize(this.displaySize);

			else
				this.display.setSizeFrom(this.$refs.vortex);

			let width = this.display.size.width;
			let height = this.display.size.height;

			this.diag = Math.ceil(Math.sqrt(width * width + height * height));
			this.radius = Math.ceil(this.diag / 2 / this.numCircles);

			this.tile.top = Math.ceil(height / 2 - this.radius * this.numCircles);
			this.tile.left = Math.ceil(width / 2 - this.radius * this.numCircles);
		},

		mounted() {
			this.tiles.forEach((tile, i) => {
				tile.setCss({
					top: this.getTileTop(i) +'px',
					left: this.getTileLeft(i) +'px',
					backgroundRepeat: 'repeat'
				});
			});
		},

		methods: {
			getTileTop(i) {
				return this.tile.top + this.radius * i;
			},

			getTileLeft(i) {
				return this.tile.left + this.radius * i;
			},

			getTileCss(i) {
				i--;

				let width = (this.numCircles - i) * this.radius * 2;
				let height = width;
				let zIndex = 13 + i;

				return {
					top: this.getTileTop(i) +'px',
					left: this.getTileLeft(i) +'px',
					width: width +'px',
					height: height +'px',
					borderRadius: Math.ceil(width / 2) +'px',
					zIndex: zIndex,
				};
			},

			setCss(css) {
				this.style = {
					...this.style,
					...css,
				};
			},

			transform(func) {
				this.$nextTick(() => {
					this.tiles.forEach((tile, i) => func(tile, i));
				});
			}
		}
	};
</script>
