import { computed, unref } from 'vue';

export const baseProps = {
	color: [ String, Object ],

	rsc: Object,

	size: Object,

	viewSize: {
		type: Object,
		default: () => ({}),
	},

	offset: Object,

	css: Object,
};

export default ($el, props, styles) => {
	styles.size = computed(() => {
		const size = props.size;

		if (!size || !size.width || !size.height) {
			return {};
		}

		const {
			width = size.width,
			height = size.height,
		} = props.viewSize;

		return {
			width: width +'px',
			height: height +'px',
		};
	});

	const style = computed(() => ({
		...unref(styles.size),
		...unref(styles.color),
		...unref(styles.image),
		...unref(props.css),
		...unref(styles.base),
	}));

	const setCss = css => {
		Object.assign(styles.base, css);
	};

	const transform = css => {
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
}
