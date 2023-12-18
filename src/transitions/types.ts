import Size from '../shared/Size';
import Resource from '../resources/Resource';
import { CSSProperties, Component } from 'vue';
import { Direction } from '../controllers/Player';

export interface TransitionProps {
	size: Size;
	from: Resource;
	to?: Resource;
	options?: any;
	maskStyle: CSSProperties;
	displayComponent: any;
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
