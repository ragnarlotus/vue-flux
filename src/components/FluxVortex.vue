<template>
	<div ref="vortex" :style="style">
		<flux-image
			v-for="(tile, index) in tiles"
			ref="tiles"
			:key="index"
			:size="tile.size"
			:image="img"
			:offset="tile.offset"
			:style="tile.style"
		/>
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent';
	import FluxImage from '@/components/FluxImage';

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

			tileCss: Object,
		},

		data: () => ({
			baseStyle: {
				position: 'relative',
				overflow: 'hidden',
			},

			img: undefined,
		}),

		computed: {
			numCircles() {
				return Math.round(parseFloat(this.circles));
			},

			diag() {
				let { width, height } = this.size;

				return Math.ceil(Math.sqrt(width * width + height * height));
			},

			radius() {
				return Math.ceil(this.diag / 2 / this.numCircles);
			},

			topGap() {
				return Math.ceil(this.size.height / 2 - this.radius * this.numCircles);
			},

			leftGap() {
				return Math.ceil(this.size.width / 2 - this.radius * this.numCircles);
			},

			tiles() {
				let tile;
				let tiles = [];

				for (let i = 0; i < this.numCircles; i++) {
					let size = (this.numCircles - i) * this.radius * 2;
					let gap = this.radius * i;

					tile = {
						size: {
							width: size,
							height: size,
						},
						offset: {
							top: this.topGap + gap,
							left: this.leftGap + gap,
						},
					};

					tile.style = {
						...this.tileCss,
						position: 'absolute',
						left: tile.offset.left +'px',
						top: tile.offset.top + 'px',
						backgroundRepeat: 'repeat',
						borderRadius: '50%',
						zIndex: i,
					};

					tiles.push(tile);
				}

				return tiles;
			},
		},

		methods: {
			transform(func) {
				this.$refs.tiles.forEach((tile, i) => func(tile, i));
			},
		},
	};
</script>
