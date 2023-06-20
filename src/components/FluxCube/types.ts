/* eslint-disable no-unused-vars */
import { CSSProperties } from 'vue';
import Resource from '../../resources/Resource';
import { Position, Size } from '../../shared';
import { ComponentProps } from '../component';

export interface Props extends ComponentProps {
	rscs: SidesResources;
	colors?: SidesColors;
	offsets?: SidesOffsets;
	depth: number;
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
	[Sides.front]?: Position;
	[Sides.back]?: Position;
	[Sides.left]?: Position;
	[Sides.right]?: Position;
	[Sides.top]?: Position;
	[Sides.bottom]?: Position;
}

export interface SidesProps {
	[Sides.front]?: SideProps;
	[Sides.back]?: SideProps;
	[Sides.left]?: SideProps;
	[Sides.right]?: SideProps;
	[Sides.top]?: SideProps;
	[Sides.bottom]?: SideProps;
}

export interface SideProps {
	ref: string;
	rsc?: Resource;
	size: Size;
	viewSize?: Size;
	color?: string;
	offset?: Position;
	css: CSSProperties;
}
