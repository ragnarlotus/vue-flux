/* eslint-disable no-unused-vars */
import { CSSProperties } from 'vue';
import Resource from '../../resources/Resource';
import Size from '../../shared/Size';
import { Offset } from '../../types';
import { ComponentProps } from '../../mixins/component';

export interface Props extends ComponentProps {
	rscs: SidesResources;
	colors?: SidesColors;
	offsets?: SidesOffsets;
	depth: number;
	sidesCss: any;
}

export type Side = 'front' | 'back' | 'top' | 'bottom' | 'left' | 'right';

export enum Sides {
	front = 'front',
	back = 'back',
	left = 'left',
	right = 'right',
	top = 'top',
	bottom = 'bottom',
}

export type Turn = Side & ('backl' | 'backr');

export enum Turns {
	front = 'front',
	back = 'back',
	backr = 'backr',
	backl = 'backl',
	left = 'left',
	right = 'right',
	top = 'top',
	bottom = 'bottom',
}

export interface SidesColors {
	[Sides.front]?: string;
	[Sides.back]?: string;
	[Sides.left]?: string;
	[Sides.right]?: string;
	[Sides.top]?: string;
	[Sides.bottom]?: string;
}

export interface SidesResources {
	[Sides.front]?: Resource;
	[Sides.back]?: Resource;
	[Sides.left]?: Resource;
	[Sides.right]?: Resource;
	[Sides.top]?: Resource;
	[Sides.bottom]?: Resource;
}

export interface SidesOffsets {
	[Sides.front]?: Offset;
	[Sides.back]?: Offset;
	[Sides.left]?: Offset;
	[Sides.right]?: Offset;
	[Sides.top]?: Offset;
	[Sides.bottom]?: Offset;
}

export interface SideProps {
	ref: string;
	rsc?: Resource;
	size: Size;
	viewSize?: Size;
	color?: string;
	offset?: Offset;
	css: CSSProperties;
}
