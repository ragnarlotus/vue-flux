export const round = number => Math.round(parseFloat(number));

export const floor = number => Math.floor(parseFloat(number));

export const ceil = number => Math.ceil(parseFloat(number));

export const diag = size => {
	const { width, height } = size;
	return ceil(Math.sqrt(width * width + height * height));
};

export const aspectRatio = ({width, height}) => width / height;
