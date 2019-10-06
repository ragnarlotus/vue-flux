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
	import Dom from '@/libraries/Dom';
	import Img from '@/libraries/Img';
	import FluxImage from '@/components/FluxImage';

	export default {
		name: 'FluxVortex',

		components: {
			FluxImage,
		},

		props: {
			circles: {
				type: Number,
				default: 1,
			},

			image: [ String, Object ],

			size: {
				type: Object,
				required: true,
			},

			tileCss: Object,
		},

		data: () => ({
			baseStyle: {
				display: 'inline-block',
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

			sizeStyle() {
				let { width, height } = this.size;

				return {
					width: Dom.px(width),
					height: Dom.px(height),
				};
			},

			style() {
				return {
					...this.baseStyle,
					...this.sizeStyle,
				};
			},
		},

		watch: {
			image() {
				this.init();
			},

			size() {
				this.img.resizeToCover(this.size);
			},
		},

		created() {
			this.init();
		},

		methods: {
			async init() {
				if (!this.image)
					return;

				if (this.image.src) {
					this.img = this.image;
					return;
				}

				this.img = new Img(this.image);

				await this.img.load();

				this.img.resizeToCover(this.size);
			},

			transform(func) {
				this.$refs.tiles.forEach((tile, i) => func(tile, i));
			},
		},
	};
</script>
