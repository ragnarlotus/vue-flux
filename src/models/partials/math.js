export const round = number => Math.round(parseFloat(number));

export const ceil = number => Math.ceil(number);

export const diag = size => {
	const { width, height } = size;
	return ceil(Math.sqrt(width * width + height * height));
};
