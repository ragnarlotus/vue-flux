import DomHelper from '../classes/DomHelper.js';

export default {
	name: 'FluxBase',

	data: () => ({
		display: {
			size: undefined,
		},
		image: {
			src: undefined,
			size: undefined,
		},
	}),

	props: {
		slider: {
			type: Object,
			required: false,
		},

		displaySize: {
			type: Object,
			required: false,
		},

		imageSrc: {
			type: String,
			required: false,
		},

		imageSize: {
			type: Object,
			required: false,
		},

		color: {
			type: String,
			required: false,
		},
	},

	watch: {
		displaySize: function(newSize, oldSize) {
			this.setDisplaySize(newSize);
		},

		imageSrc: function(newSrc, oldSrc) {
			this.setSrc(newSrc);
		},

		imageSize: function(newSize, oldSize) {
			this.setImageSize(newSize);
		},

		color: function() {
			if (this.setColor)
				this.setColor(this.color);
		}
	},

	mounted() {
		this.setDisplaySize();

		if (this.imageSrc)
			this.setImageSrc(this.imageSrc);

		if (this.imageSize)
			this.setImageSize(this.imageSize);
	},

	methods: {
		getDisplaySize() {
			return this.display.size;
		},

		setDisplaySize(size) {
			if (size !== undefined) {
				this.display.size = size;
				return;
			}

			if (this.slider !== undefined) {
				this.display.size = this.slider.size;
				return;
			}

			let container = new DomHelper(this.$refs.display);

			this.display.size = container.getSize();
		},

		getImageSrc() {
			return this.image.src;
		},

		setImageSrc(src) {
			if (typeof src !== 'string')
				return;

			this.image.src = src;
			this.image.size = undefined;

			if (this.init)
				this.init();
		},

		getImageSize() {
			return this.image.size;
		},

		setImageSize(size) {
			let img = this.$refs.image;

			if (size && size.width !== undefined && size.height !== undefined) {
				this.image.size = size;

			} else if (img.naturalWidth || img.width) {
				this.image.size = {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				};
			}

			if (this.init)
				this.init();
		},

		getImage() {
			return this.image;
		},

		setCss(css) {
			this.style = {
				...this.style,
				...css,
			};
		},
	},
};
