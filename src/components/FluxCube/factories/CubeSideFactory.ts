import { Position } from '../../../shared';
import { Resource } from '../../../resources';
import { Side, SideProps } from '../types';
import SideTransformFactory from './SideTransformFactory';
import { FluxImage } from '../../';
import { CSSProperties } from 'vue';

export default class CubeSideFactory {
	static getProps(
		sideTransformFactory: SideTransformFactory,
		side: Side,
		color?: CSSProperties['color'],
		rsc?: Resource,
		offset?: Position
	) {
		const { depth, size, viewSize } = sideTransformFactory;

		const props: SideProps = {
			name: side,
			component: rsc ? rsc.transition.component : FluxImage,
			color: color,
			rsc: rsc,
			size: size.clone(),
			viewSize: viewSize.clone(),
			offset: offset,
			style: {
				position: 'absolute',
				transform: sideTransformFactory.getSideCss(side),
				backfaceVisibility: 'hidden',
			},
		};

		if (['left', 'right'].includes(side)) {
			props.viewSize.width.value = depth;
			props.size.width.value = depth;
		}

		if (['top', 'bottom'].includes(side)) {
			props.viewSize.height.value = depth;
			props.size.height.value = depth;
		}

		return props;
	}
}
