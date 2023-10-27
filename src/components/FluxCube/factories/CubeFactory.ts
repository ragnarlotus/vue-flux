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

export default class CubeFactory {
	static getSidesProps(
		sideTransformFactory: SideTransformFactory,
		colors: SidesColors,
		rscs: SidesResources,
		offsets: SidesOffsets,
		offset?: Position
	) {
		const sides = getDefinedSides(colors, rscs);
		const props: SidesProps = {};

		sides.forEach((side: Side) => {
			props[side] = CubeSideFactory.getProps(
				sideTransformFactory,
				side,
				colors[side],
				rscs[side],
				offsets[side] !== undefined ? offsets[side] : offset
			);
		});

		return props;
	}
}
