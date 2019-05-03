<template>
	<div :style="style" ref="grid">
		<component
			:is="component"
			v-for="i in numTiles"
			:key="i"
			:size="tileSize"
			:image="image"
			:images="images"
			:color="color"
			:css="getTileCss(i)"
			ref="tiles">
		</component>
	</div>
</template>

<script>
	import DomHelper from '@/libraries/DomHelper.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxGrid',

		components: {
			FluxCube,
			FluxImage,
		},

		data: () => ({
			mounted: false,
			style: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			},
		}),

		props: {
			rows: {
				type: Number,
				required: false,
				default: () => 1,
			},

			cols: {
				type: Number,
				required: false,
				default: () => 1,
			},

			size: {
				type: Object,
				default: () => ({}),
			},

			image: {
				type: [ String, Object ],
				default: () => ({}),
			},

			images: {
				type: Object,
				default: () => ({}),
			},

			color: {
				type: [ String, Object ],
				default: () => 'transparent',
			},

			css: {
				type: Object,
				default: () => ({}),
			},

			tileCss: {
				type: Object,
				default: () => ({}),
			},
		},

		computed: {
			component() {
				return Object.keys(this.images).length? 'FluxCube' : 'FluxImage';
			},

			viewSize() {
				if (this.size.width && this.size.height)
					return this.size;

				if (!this.mounted)
					return {};

				let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

				return {
					width: this.size.width || parentSize.width,
					height: this.size.height || parentSize.height,
				};
			},

			numTiles() {
				return this.rows * this.cols;
			},

			tileSize() {
				return {
					width: Math.ceil(this.viewSize.width / this.cols),
					height: Math.ceil(this.viewSize.height / this.rows),
				};
			}
		},

		mounted() {
			this.mounted = true;
		},

		methods: {
			getRowNumber(i) {
				return Math.floor(i / this.cols);
			},

			getColNumber(i) {
				return i % this.cols;
			},

			getTileCss(i) {
				i--;

				let row = this.getRowNumber(i);
				let col = this.getColNumber(i);

				let width = this.tileSize.width;
				let height = this.tileSize.height;

				let top = row * height;
				let left = col * width;

				if (row + 1 === this.rows)
					height = this.viewSize.height - row * height;

				if (col + 1 === this.cols)
					width = this.viewSize.width - col * width;

				let zIndex = i + 1 < this.cols / 2? i + 1 : this.cols - i;

				return {
					...this.tileCss,
					top: top +'px',
					left: left +'px',
					width: width +'px',
					height: height +'px',
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
					this.$refs.tiles.forEach((tile, i) => func(tile, i));
				});
			},
		},
	};
</script>
