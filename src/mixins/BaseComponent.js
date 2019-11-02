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

		size: {
			type: Object,
		},

		viewSize: {
			type: Object,
			default: () => ({}),
		},

		offset: Object,

		offsets: {
			type: Object,
			default: () => ({}),
		},

		css: Object,
	},

	data: () => ({
		img: undefined,
		imgs: undefined,
		baseStyle: {},
	}),

	computed: {
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

	watch: {
		image: function() {
			this.initImg();
		},

		images: function() {
			this.initImgs();
		},
	},

	created() {
		this.initImg();
		this.initImgs();
	},

	methods: {
		initImg() {
			if (!this.image)
				return this.img = undefined;

			if (this.image.src)
				return this.img = this.image;

			this.img = new Img(this.image);
			this.img.load();
		},

		initImgs() {
			if (!this.images)
				return this.imgs = undefined;

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

			this.imgs = imgs;
		},

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
