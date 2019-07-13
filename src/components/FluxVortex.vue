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
	import BaseComponent from '@/mixins/BaseComponent.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxVortex',

		components: {
			FluxImage,
		},

		mixins: [
			BaseComponent,
		],

		props: {
			circles: {
				type: Number,
				default: 1,
			},

			image: [ String, Object ],

			tileCss: Object,
		},

		computed: {
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

			style() {
				return {
					...this.baseStyle,
					...this.css,
				};
			},
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

			transform(func) {
				this.$nextTick(() => {
					this.$refs.tiles.forEach((tile, i) => func(tile, i));
				});
			},
		},
	};
</script>
