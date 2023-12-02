import { computed, CSSProperties, Ref, unref } from 'vue';
import { Size } from '../shared';
import { ComponentProps, ComponentStyles } from './types';

export default function useComponent(
	$el: Ref<null | HTMLElement>,
	props: ComponentProps,
	css: ComponentStyles
) {
	if (css.base === undefined) {
		css.base = {} as CSSProperties;
	}

	const size = computed<CSSProperties>(() => {
		const { size, viewSize = new Size() } = props;

		const { width = size.width.value, height = size.height.value } =
			viewSize.toValue();

		const finalSize = new Size({ width, height });

		if (!finalSize.isValid()) {
			return {};
		}

		return finalSize.toPx();
	});

	const style = computed(() => ({
		...unref(size),
		...unref(css.color),
		...unref(css.rsc),
		...unref(props.css),
		...unref(css.base),
	}));

	const setCss = (s: CSSProperties) => {
		Object.assign(css.base as CSSProperties, s);
	};

	const transform = (s: CSSProperties) => {
		if ($el.value === null) {
			return;
		}

		$el.value.clientHeight;
		setCss(s);
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
