import {
	Side,
	SidesColors,
	SidesResources,
	SidesOffsets,
	SidesProps,
} from '../types';
import CubeSideFactory from './CubeSideFactory';
import SideTransformFactory from './SideTransformFactory';
import { Position } from '../../../shared';
import Sides from '../Sides';
import { Resource } from '../../../resources';
import { CSSProperties } from 'vue';

function isSideDefined(
	side: Side,
	colors?: SidesColors,
	rscs?: SidesResources
) {
	if (colors && colors[side]) {
		return true;
	}

	if (rscs && rscs[side]) {
		return true;
	}

	return false;
}

function getDefinedSides(
	color?: CSSProperties['color'],
	colors?: SidesColors,
	rsc?: Resource,
	rscs?: SidesResources
) {
	const sides = Object.values(Sides);

	if (color || rsc) {
		return sides;
	}

	return Object.values(Sides).filter((side) =>
		isSideDefined(side, colors, rscs)
	);
}

export default class CubeFactory {
	static getSidesProps(
		sideTransformFactory: SideTransformFactory,
		color?: CSSProperties['color'],
		colors?: SidesColors,
		rsc?: Resource,
		rscs?: SidesResources,
		offset?: Position,
		offsets?: SidesOffsets
	) {
		const sides = getDefinedSides(color, colors, rsc, rscs);
		const props: SidesProps = {};

		sides.forEach((side: Side) => {
			props[side] = CubeSideFactory.getProps(
				sideTransformFactory,
				side,
				colors && colors[side] ? colors[side] : color,
				rscs && rscs[side] ? rscs[side] : rsc,
				offsets && offsets[side] ? offsets[side] : offset
			);
		});

		return props;
	}
}
