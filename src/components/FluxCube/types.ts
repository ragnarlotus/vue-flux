/* eslint-disable no-unused-vars */
import { CSSProperties } from 'vue';
import Resource from '../../resources/Resource';
import { Position, Size } from '../../shared';
import { ComponentProps } from '../component';

export interface Props extends ComponentProps {
	colors?: SidesColors;
	rscs?: SidesResources;
	offsets?: SidesOffsets;
	depth?: number;
	origin?: string;
}

export enum Sides {
	front = 'front',
	back = 'back',
	left = 'left',
	right = 'right',
	top = 'top',
	bottom = 'bottom',
}

export type Side =
	| Sides.front
	| Sides.back
	| Sides.left
	| Sides.right
	| Sides.top
	| Sides.bottom;

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

export type Turn =
	| Turns.front
	| Turns.back
	| Turns.backr
	| Turns.backl
	| Turns.left
	| Turns.right
	| Turns.top
	| Turns.bottom;

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

export interface SideProps {
	name: string;
	component: any;
	rsc?: Resource;
	size: Size;
	viewSize: Size;
	color?: string;
	offset?: Position;
	style: CSSProperties;
}

export interface SidesProps {
	[Sides.front]?: SideProps;
	[Sides.back]?: SideProps;
	[Sides.left]?: SideProps;
	[Sides.right]?: SideProps;
	[Sides.top]?: SideProps;
	[Sides.bottom]?: SideProps;
}
