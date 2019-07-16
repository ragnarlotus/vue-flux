import DomHelper from '@/libraries/DomHelper.js';

export default {
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
		size: {
			type: Object,
			default: () => ({}),
		},

		color: {
			type: [ String, Object ],
			default: 'transparent',
		},

		css: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		viewSize() {
			let size = {
				...this.finalSize,
			};

			if (this.css.width)
				size.width = parseFloat(this.css.width);

			if (this.css.height)
				size.height = parseFloat(this.css.height);

			return size;
		},

		finalSize() {
			if (this.size.width && this.size.height) {
				return {
					...this.size,
				};
			}

			if (!this.mounted)
				return undefined;

			let parentSize = DomHelper.sizeFrom(this.$el.parentNode);

			return {
				width: this.size.width || parentSize.width,
				height: this.size.height || parentSize.height,
			};
		},

		sizeStyle() {
			if (!this.finalSize)
				return {};

			let size = {
				width: this.finalSize.width || '100%',
				height: this.finalSize.height || '100%',
			};

			if (/[0-9]$/.test(size.width))
				size.width += 'px';

			if (/[0-9]$/.test(size.height))
				size.height += 'px';

			return size;
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
		setCss(css) {
			this.baseStyle = {
				...this.baseStyle,
				...css,
			};
		},

		transform(css) {
			this.$nextTick(() => {
				this.$el.clientHeight;
				this.setCss(css);
			});
		},
	},
}
