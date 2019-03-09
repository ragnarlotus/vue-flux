<template>
	<div :style="style">
		<flux-image
			v-for="i in numCircles"
			:key="i"
			:slider="slider"
			:index="index"
			:css="getTileCss(i)"
			ref="tiles">
		</flux-image>
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxVortex',

		components: {
			FluxImage
		},

		data: () => ({
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
			slider: { type: Object, required: true },
			numCircles: { type: Number, default: 0 },
			index: { type: Number, required: true }
		},

		computed: {
			size: function() {
				return this.slider.size;
			},

			tiles: function() {
				return this.$refs.tiles;
			}
		},

		created() {
			let width = this.size.width;
			let height = this.size.height;

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

				return Object.assign({}, this.tileCss, {
					top: this.getTileTop(i) +'px',
					left: this.getTileLeft(i) +'px',
					width: width +'px',
					height: height +'px',
					borderRadius: Math.ceil(width / 2) +'px',
					zIndex: zIndex
				});
			},

			setCss(css) {
				this.style = Object.assign({}, this.style, css);
			},

			transform(func) {
				this.$nextTick(() => {
					this.tiles.forEach((tile, i) => func(tile, i));
				});
			}
		}
	};
</script>
