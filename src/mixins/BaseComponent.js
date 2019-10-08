import Img from '@/libraries/Img';

export default {
	props: {
		color: String,

		colors: {
			type: Object,
			default: () => ({}),
		},

		image: [ String, Object ],

		images: Object,

		offset: Object,

		size: {
			type: Object,
			required: true,
		},
	},

	data: () => ({
		css: {},
	}),

	computed: {
		img() {
			if (!this.image)
				return undefined;

			if (this.image.src)
				return this.image;

			let img = new Img(this.image);
			img.load();

			return img;
		},

		imgs() {
			if (!this.images)
				return undefined;

			let img;
			let imgs = {};

			for (let side in this.images) {
				img = this.images[side];

				if (!img.src) {
					img = new Img(img);
					img.load();
				}

				imgs[side] = img;
			}

			return imgs;
		},

		sizeStyle() {
			let { width, height } = this.size;

			return {
				width: width +'px',
				height: height +'px',
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

	methods: {
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
