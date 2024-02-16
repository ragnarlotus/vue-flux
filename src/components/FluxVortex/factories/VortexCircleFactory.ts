import { CSSProperties } from 'vue';
import { Position } from '../../../shared';
import { FluxVortexCirclesProps } from '../types';

export default class VortexCircleFactory {
	static getProps(
		vortex: {
			numCircles: number;
			diagonal: number;
			radius: number;
			topGap: number;
			leftGap: number;
		},
		circleNumber: number,
		circleCss?: CSSProperties
	) {
		const size = (vortex.numCircles - circleNumber) * vortex.radius * 2;

		const gap = vortex.radius * circleNumber;

		const offset = new Position({
			top: vortex.topGap + gap,
			left: vortex.leftGap + gap,
		});

		const circle: FluxVortexCirclesProps = {
			offset: offset,
			css: {
				...circleCss,
				...offset.toPx(),
				position: 'absolute',
				width: size + 'px',
				height: size + 'px',
				backgroundRepeat: 'repeat',
				borderRadius: '50%',
				zIndex: circleNumber,
			},
		};

		return circle;
	}
}
