/* eslint-disable no-unused-vars */
import { CSSProperties, Component } from 'vue';
import { Resource } from '../../resources';
import { Position, Size } from '../../shared';
import { ComponentProps } from '../types';
import Sides from './Sides';
import Turns from './Turns';

export interface FluxCubeProps extends ComponentProps {
	colors?: SidesColors;
	rscs?: SidesResources;
	offsets?: SidesOffsets;
	depth?: number;
	origin?: string;
}

export type Side = keyof typeof Sides;

export type Turn = keyof typeof Turns;

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
	name: Side;
	component: Component;
	rsc?: Resource;
	size: Size;
	viewSize: Size;
	color?: CSSProperties['color'];
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

export interface SidesComponents {
	[Sides.front]?: any;
	[Sides.back]?: any;
	[Sides.left]?: any;
	[Sides.right]?: any;
	[Sides.top]?: any;
	[Sides.bottom]?: any;
}
