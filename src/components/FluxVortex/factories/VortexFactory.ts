import { Maths } from '../../../shared';
import { FluxVortexProps, FluxVortexCirclesProps } from '../types';
import VortexCircleFactory from './VortexCircleFactory';

export default class VortexFactory {
	static getCirclesProps(props: FluxVortexProps) {
		const { width, height } = props.size.toValue();

		const numCircles = Math.round(props.circles!);
		const diagonal = Maths.diag({ width: width!, height: height! });
		const radius = Math.ceil(diagonal / 2 / numCircles);
		const topGap = Math.ceil(height! / 2 - radius * numCircles);
		const leftGap = Math.ceil(width! / 2 - radius * numCircles);

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
