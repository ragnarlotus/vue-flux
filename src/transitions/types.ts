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

export interface TransitionOptions {
	direction?: Direction;
	easing?: CSSProperties['animation-timing-function'];
}

export interface TransitionConf {
	totalDuration?: number;
	direction?: Direction;
	easing: CSSProperties['animation-timing-function'];
}

export type TransitionComponent = Component & {
	totalDuration: number;
	onPlay: () => void;
};

export interface TransitionWithOptions {
	component: Component;
	options: object;
}
