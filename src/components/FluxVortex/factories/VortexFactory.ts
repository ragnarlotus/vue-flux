import { ceil, diag, round } from '../../../shared/Maths';
import { FluxVortexProps, FluxVortexCirclesProps } from '../types';
import VortexCircleFactory from './VortexCircleFactory';

export default class VortexFactory {
	static getCirclesProps(props: FluxVortexProps) {
		const { width, height } = props.size.toValue();

		const numCircles = round(props.circles!);
		const diagonal = diag({ width: width!, height: height! });
		const radius = ceil(diagonal / 2 / numCircles);
		const topGap = ceil(height! / 2 - radius * numCircles);
		const leftGap = ceil(width! / 2 - radius * numCircles);

		const vortex = {
			numCircles,
			diagonal,
			radius,
			topGap,
			leftGap,
		};

		const circlesProps: FluxVortexCirclesProps[] = [];

		for (let circleNumber = 0; circleNumber < numCircles; circleNumber++) {
			circlesProps.push(
				VortexCircleFactory.getProps(vortex, circleNumber, props.tileCss)
			);
		}

		return circlesProps;
	}
}
