export const round = (number: number) => Math.round(number);

export const floor = (number: number) => Math.floor(number);

export const ceil = (number: number) => Math.ceil(number);

export const diag = ({ width, height }: { width: number; height: number }) =>
	ceil(Math.sqrt(width * width + height * height));

export const aspectRatio = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => width / height;
