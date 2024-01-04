import Resource from '../resources/Resource';
import { CSSProperties, Component } from 'vue';
import { Direction } from '../controllers/Player';
import { Size } from '../shared';

export interface TransitionProps {
	size: Size;
	from: Resource;
	to?: Resource;
	options?: object;
	maskStyle: CSSProperties;
	displayComponent: unknown;
}

export interface TransitionConf {
	totalDuration?: number;
	easing: string;
	direction?: Direction;
}

export interface TransitionWithOptions {
	component: Component;
	options: object;
}
