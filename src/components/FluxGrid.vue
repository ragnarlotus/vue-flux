<template>
	<div :style="style" ref="grid">
		<component
			:is="component"
			v-for="i in numTiles"
			:key="i"
			:size="size"
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
			baseStyle: {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			},
		}),

		props: {
			rows: {
				type: [ String, Number ],
				default: 1,
			},

			cols: {
				type: [ String, Number ],
				default: 1,
			},

			size: {
				type: Object,
			},

			image: {
				type: [ String, Object ],
			},

			images: {
				type: Object,
			},

			color: {
				type: [ String, Object ],
				default: 'transparent',
			},

			css: {
				type: Object,
			},

			tileCss: {
				type: Object,
			},
		},

		computed: {
			component() {
				return this.images? 'FluxCube' : 'FluxImage';
			},

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

			numRows() {
				return Math.round(parseFloat(this.rows));
			},

			numCols() {
				return Math.round(parseFloat(this.cols));
			},

			numTiles() {
				return this.numRows * this.numCols;
			},

			tileSize() {
				return {
					width: Math.ceil(this.viewSize.width / this.numCols),
					height: Math.ceil(this.viewSize.height / this.numRows),
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.css,
				};
			},
		},

		mounted() {
			this.mounted = true;
		},

		methods: {
			getRowNumber(i) {
				return Math.floor(i / this.numCols);
			},

			getColNumber(i) {
				return i % this.numCols;
			},

			getTileCss(i) {
				i--;

				let row = this.getRowNumber(i);
				let col = this.getColNumber(i);

				let width = this.tileSize.width;
				let height = this.tileSize.height;

				let top = row * height;
				let left = col * width;

				if (row + 1 === this.numRows)
					height = this.viewSize.height - row * height;

				if (col + 1 === this.numCols)
					width = this.viewSize.width - col * width;

				let zIndex = i + 1 < this.numCols / 2? i + 1 : this.numCols - i;

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
