<template>
	<div :style="style" ref="vortex">
		<flux-image
			v-for="i in numCircles"
			:key="i"
			:size="size"
			:image="image"
			:color="color"
			:css="getTileCss(i)"
			ref="tiles">
		</flux-image>
	</div>
</template>

<script>
	import DomHelper from '@/libraries/DomHelper.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxVortex',

		components: {
			FluxImage,
		},

		data: () => ({
			mounted: false,
			baseStyle: {
				position: 'absolute',
				width: '100%',
				height: '100%',
			},
		}),

		props: {
			circles: {
				type: Number,
				default: 1,
			},

			size: Object,

			image: [ String, Object ],

			color: String,

			css: Object,

			tileCss: Object,
		},

		computed: {
			viewSize() {
				if (this.size.width && this.size.height) {
					return {
						...this.size,
					};
				}

				if (!this.mounted)
					return {};

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			numCircles() {
				return Math.round(parseFloat(this.circles));
			},

			diag() {
				let size = this.viewSize;

				return Math.ceil(Math.sqrt(size.width * size.width + size.height * size.height));
			},

			radius() {
				return Math.ceil(this.diag / 2 / this.numCircles);
			},

			topGap() {
				return Math.ceil(this.viewSize.height / 2 - this.radius * this.numCircles);
			},

			leftGap() {
				return Math.ceil(this.viewSize.width / 2 - this.radius * this.numCircles);
			},
		},

		mounted() {
			this.mounted = true;
		},

		methods: {
			getTileCss(i) {
				i--;

				let width = (this.numCircles - i) * this.radius * 2;

				return {
					...this.tileCss,
					top: (this.topGap + this.radius * i) +'px',
					left: (this.leftGap + this.radius * i) +'px',
					width: width +'px',
					height: width +'px',
					backgroundRepeat: 'repeat',
					borderRadius: '50%',
					zIndex: i,
				};
			},

			setCss(css) {
				this.baseStyle = {
					...this.baseStyle,
					...css,
				};
			},

			transform(func) {
				this.$nextTick(() => {
					this.$refs.tiles.forEach((tile, i) => func(tile, i));
				});
			},
		},
	};
</script>
