import { CSSProperties } from 'vue';
import Size from '../../shared/Size';
import { Offset } from '../../types';
import { ComponentProps } from '../../mixins/component';
import { SidesResources } from '../FluxCube/types';

export interface Props extends ComponentProps {
	rscs: SidesResources;
	rows?: number;
	cols?: number;
	depth?: number;
	tileStyle?: CSSProperties;
}

export interface Tile {
	row: number;
	col: number;
	offset: Offset;
	viewSize: Size;
	css: CSSProperties;
}

export type Grid = Tile[];
