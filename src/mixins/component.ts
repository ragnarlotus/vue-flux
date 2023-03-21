import { computed, Ref, unref } from 'vue';
import Resource from '../resources/Resource';
import Size from '../shared/Size';
import { Offset } from '../types';

interface BaseProps {
	color?: string | {};
	rsc: Resource;
	size: Size;
	viewSize: Size;
	offset?: Offset;
	css?: object;
}

export const baseProps = {
	color: {
		type: [String, Object],
		required: false,
		default: undefined,
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
		default: undefined,
	},

	css: Object,
};

export default ($el: Ref, props: BaseProps, styles: object) => {
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
