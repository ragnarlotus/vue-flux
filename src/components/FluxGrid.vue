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
			:depth="depth"
			:css="getTileCss(i)"
			ref="tiles" />
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxGrid',

		components: {
			FluxCube,
			FluxImage,
		},

		mixins: [
			BaseComponent,
		],

		props: {
			rows: {
				type: Number,
				default: 1,
			},

			cols: {
				type: Number,
				default: 1,
			},

			image: [ String, Object ],

			images: Object,

			depth: Number,

			tileCss: Object,
		},

		computed: {
			component() {
				return this.images? 'FluxCube' : 'FluxImage';
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

				let { width, height } = this.tileSize;

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

			transform(func) {
				this.$nextTick(() => {
					this.$refs.tiles.forEach((tile, i) => func(tile, i));
				});
			},
		},
	};
</script>
