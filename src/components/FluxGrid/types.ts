import { CSSProperties } from 'vue';
import { Position, Size } from '../../shared';
import { Resource } from '../../resources';
import { SidesColors, SidesResources } from '../FluxCube/types';

export interface TileProps {
	color?: string;
	colors?: SidesColors;
	rsc?: Resource;
	rscs?: SidesResources;
	size: Size;
	viewSize?: Size;
	offset: Position;
	depth: number;
	css?: CSSProperties;
}
