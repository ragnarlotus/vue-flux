import { CSSProperties } from 'vue';
import { Position, Size } from '../../shared';
import { Resource } from '../../resources';
import { SidesColors, SidesResources } from '../FluxCube/types';
import { ComponentProps } from '../component';

export interface GridProps extends ComponentProps {
	colors?: SidesColors;
	rscs?: SidesResources;
	rows?: number;
	cols?: number;
	depth?: number;
	tileCss?: CSSProperties;
}

export interface TileProps {
	color?: string;
	colors?: SidesColors;
	rsc?: Resource;
	rscs?: SidesResources;
	size: Size;
	depth: number;
	offset: Position;
	viewSize?: Size;
	css?: CSSProperties;
}
