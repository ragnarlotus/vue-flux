<template>
	<div :style="style" />
</template>

<script>
	import Dom from '@/libraries/Dom';
	import Img from '@/libraries/Img';
	import BaseComponent from '@/mixins/BaseComponent';

	export default {
		name: 'FluxImage',

		mixins: [
			BaseComponent,
		],

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
			baseStyle: {
				overflow: 'hidden',
			},

			css: undefined,

			img: undefined,
		}),

		computed: {
			colorStyle() {
				if (!this.color)
					return {};

				return {
					backgroundColor: this.color,
				};
			},

			imageStyle() {
				if (!this.img)
					return {};

				let realSize = this.img.real.size;
				let coverSize = this.img.cover.size;

				if (!realSize || !coverSize)
					return {};

				let position = {
					...this.img.cover.position,
				};

				if (this.offset) {
					['top', 'left'].forEach(side => {
						position[side] -= this.offset[side] || 0;
					});
				}

				return {
					backgroundImage: `url(${this.img.src})`,
					backgroundSize: `${coverSize.width}px ${coverSize.height}px`,
					backgroundPosition: `${position.left}px ${position.top}px`,
					backgroundRepeat: 'no-repeat',
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
					...this.css,
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

				if (this.image instanceof Img) {
					this.img = this.image;
					return;
				}

				this.img = new Img(this.image);

				await this.img.load();

				this.img.resizeToCover(this.size);
			},

			setCss(css) {
				this.css = {
					...this.css,
					...css,
				};
			},

			transform(css) {
				this.$el.clientHeight;
				this.setCss(css);
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
