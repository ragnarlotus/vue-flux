import { computed, unref } from 'vue';

export const baseProps = {
	color: {
		type: [String, Object],
		required: false,
		default: null,
	},

	rsc: Object,

	size: Object,

	viewSize: {
		type: Object,
		default: () => ({}),
	},

	offset: {
		type: [Number, Object],
		required: false,
		default: null,
	},

	css: Object,
};

export default ($el, props, styles) => {
	styles.size = computed(() => {
		const size = props.size;

		if (!size || !size.width || !size.height) {
			return {};
		}

		const { width = size.width, height = size.height } = props.viewSize;

		return {
			width: width + 'px',
			height: height + 'px',
		};
	});

	const style = computed(() => ({
		...unref(styles.size),
		...unref(styles.color),
		...unref(styles.image),
		...unref(props.css),
		...unref(styles.base),
	}));

	const setCss = (css) => {
		Object.assign(styles.base, css);
	};

	const transform = (css) => {
		$el.value.clientHeight;
		setCss(css);
	};

	const show = () => {
		setCss({
			visibility: 'visible',
		});
	};

	const hide = () => {
		setCss({
			visibility: 'hidden',
		});
	};

	return {
		style,
		setCss,
		transform,
		show,
		hide,
	};
};
