import { Resource } from '../resources';
import { CSSProperties, Component } from 'vue';
import { Direction } from '../controllers/Player';
import { Size } from '../shared';
import { FluxComponent } from '../components';

export interface TransitionProps {
	size: Size;
	from: Resource;
	to?: Resource;
	options?: object;
	maskStyle: CSSProperties;
	displayComponent: FluxComponent;
}

export interface TransitionConf {
	totalDuration?: number;
	easing: CSSProperties['animation-timing-function'];
	direction?: Direction;
}

export interface TransitionWithOptions {
	component: Component;
	options: object;
}
