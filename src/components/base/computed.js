import { computed } from 'vue';

export const computedStyle = (
	sizeStyle,
	colorStyle,
	imageStyle,
	props,
	baseStyle
) => computed(() => ({
	...sizeStyle,
	...colorStyle,
	...imageStyle,
	...props.css,
	...baseStyle,
}));

export const computedSizeStyle = props =>
	computed(() => {
		if (!props.size)
			return {};

		const { size } = props;

		const {
			width = size.width,
			height = size.height,
		} = props.viewSize;

		return {
			width: width +'px',
			height: height +'px',
		};
	})
);
