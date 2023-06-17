import { CSSProperties } from 'vue';
import { Position, Size } from '../../shared';
import { ComponentProps } from '../component';
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
	offset: Position;
	viewSize: Size;
	css: CSSProperties;
}

export type Grid = Tile[];
