export const diag = ({ width, height }: { width: number; height: number }) =>
	Math.ceil(Math.sqrt(width * width + height * height));

export const aspectRatio = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => width / height;
