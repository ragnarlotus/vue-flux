import {
	Side,
	SidesColors,
	SidesResources,
	SidesOffsets,
	SidesProps,
} from './types';
import CubeSideCreator from './CubeSideCreator';
import SideTransformCreator from './SideTransformCreator';

export default class CubeCreator {
	sides: Side[];
	colors: SidesColors;
	rscs: SidesResources;
	offsets: SidesOffsets;

	constructor(
		sides: Side[],
		colors: SidesColors,
		rscs: SidesResources,
		offsets: SidesOffsets
	) {
		this.sides = sides;
		this.colors = colors;
		this.rscs = rscs;
		this.offsets = offsets;
	}

	getSidesProps(sideTransformCreator: SideTransformCreator) {
		const props: SidesProps = {};

		this.sides.forEach((sideName: Side) => {
			const cubeSideCreator = new CubeSideCreator(sideName);

			props[sideName] = cubeSideCreator.getProps(
				sideTransformCreator,
				this.colors[sideName],
				this.rscs[sideName],
				this.offsets[sideName]
			);
		});

		return props;
	}
}
