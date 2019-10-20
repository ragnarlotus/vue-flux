import Dom from '@/libraries/Dom';
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

		offsets: {
			type: Object,
			default: () => ({}),
		},

		size: {
			type: Object,
		},

		viewSize: {
			type: Object,
			default: () => ({}),
		},

		css: Object,
	},

	data: () => ({
		baseStyle: {},
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

		domSize() {
			return Dom.sizeFrom(this.$el);
		},

		sizeStyle() {
			if (!this.size)
				return {};

			let size = this.size;

			let {
				width = size.width,
				height = size.height,
			} = this.viewSize;

			return {
				width: width +'px',
				height: height +'px',
			};
		},

		style() {
			return {
				...this.sizeStyle,
				...this.colorStyle,
				...this.imageStyle,
				...this.css,
				...this.baseStyle,
			};
		},
	},

	methods: {
		setCss(css) {
			this.baseStyle = {
				...this.baseStyle,
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
