<template>
	<div :style="style" />
</template>

<script>
	import Dom from '@/libraries/Dom';
	import Img from '@/libraries/Img';

	export default {
		name: 'FluxImage',

		props: {
			color: String,
			image: [ String, Object ],
			size: {
				type: Object,
				required: true,
			},
			offset: Object,
		},

		data: () => ({
			img: null,
			parentSize: null,
			baseStyle: {
				display: 'inline-block',
				overflow: 'hidden',
			},
		}),

		computed: {
			imageStyle() {
				if (!this.img)
					return {};

				let realSize = this.img.real.size;
				let coverSize = this.img.cover.size;

				if (!realSize || !coverSize)
					return {};

				let position = this.img.cover.position;

				if (this.offset) {
					['top', 'left'].forEach(side => {
						position[side] += this.offset[side] || 0;
					});
				}

				return {
					backgroundImage: `url(${this.img.src})`,
					backgroundSize: `${coverSize.width}px ${coverSize.height}px`,
					backgroundPosition: `${position.left}px ${position.top}px`,
					backgroundRepeat: 'no-repeat',
				};
			},

			colorStyle() {
				return {
					backgroundColor: this.color,
				};
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
					...this.colorStyle,
					...this.imageStyle,
				};
			},
		},

		watch: {
			image() {
				this.init();
			},
		},

		created() {
			this.init();
		},

		methods: {
			async init() {
				if (!this.image)
					return;

				this.img = typeof this.image === 'string'? new Img(this.image) : this.image;

				await this.img.load();
				this.img.resizeToCover(this.size);
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
			},
		},
	};
</script>
