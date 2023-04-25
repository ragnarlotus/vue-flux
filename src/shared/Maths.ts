import Size from './Size';

export const round = (number: number) => Math.round(number);

export const floor = (number: number) => Math.floor(number);

export const ceil = (number: number) => Math.ceil(number);

export const diag = (size: Size) => {
	const { width, height } = size.toRaw();

	return ceil(Math.sqrt(width * width + height * height));
};

export const aspectRatio = (size: Size) => {
	const { width, height } = size.toRaw();

	return width / height;
};
