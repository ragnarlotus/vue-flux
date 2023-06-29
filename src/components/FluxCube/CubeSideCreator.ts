import { Position } from '../../shared';
import { Resource } from '../../resources';
import { Side, SideProps } from './types';
import SideTransformCreator from './SideTransformCreator';
import { FluxImage } from '..';

export default class CubeSideCreator {
	side: Side;

	constructor(side: Side) {
		this.side = side;
	}

	getProps(
		sideTransformCreator: SideTransformCreator,
		color?: string,
		rsc?: Resource,
		offset?: Position
	) {
		const { depth, size, viewSize } = sideTransformCreator;

		const props: SideProps = {
			name: this.side,
			component: rsc ? rsc.transition.component : FluxImage,
			color: color,
			rsc: rsc,
			size: size.clone(),
			viewSize: viewSize.clone(),
			offset: offset,
			style: {
				position: 'absolute',
				transform: sideTransformCreator.getSideCss(this.side),
				backfaceVisibility: 'hidden',
			},
		};

		if (['left', 'right'].includes(this.side)) {
			props.viewSize.width.value = depth;
			props.size.width.value = depth;
		}

		if (['top', 'bottom'].includes(this.side)) {
			props.viewSize.height.value = depth;
			props.size.height.value = depth;
		}

		return props;
	}
}
