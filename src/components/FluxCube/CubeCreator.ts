import {
	Side,
	SidesColors,
	SidesResources,
	SidesOffsets,
	SidesProps,
	Sides,
} from './types';
import CubeSideCreator from './CubeSideCreator';
import SideTransformCreator from './SideTransformCreator';
import { Position } from '../../shared';

function isSideDefined(side: Side, colors: SidesColors, rscs: SidesResources) {
	if (colors[side] !== undefined) {
		return true;
	}

	if (rscs[side] !== undefined) {
		return true;
	}

	return false;
}

function getDefinedSides(colors: SidesColors, rscs: SidesResources) {
	return Object.values(Sides).filter((side) =>
		isSideDefined(side, colors, rscs)
	);
}

export default class CubeCreator {
	static getSidesProps(
		sideTransformCreator: SideTransformCreator,
		colors: SidesColors,
		rscs: SidesResources,
		offsets: SidesOffsets,
		offset?: Position
	) {
		const sides = getDefinedSides(colors, rscs);
		const props: SidesProps = {};

		sides.forEach((side: Side) => {
			props[side] = CubeSideCreator.getProps(
				sideTransformCreator,
				side,
				colors[side],
				rscs[side],
				offsets[side] !== undefined ? offsets[side] : offset
			);
		});

		return props;
	}
}
