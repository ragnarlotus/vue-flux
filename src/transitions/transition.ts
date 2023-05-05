import Size from '../shared/Size';
import Resource from '../resources/Resource';
import { CSSProperties } from 'vue';
import { Direction, Directions } from '../types';

export interface TransitionProps {
	size: Size;
	from: Resource;
	to?: Resource;
	current: any;
	options?: any;
	maskStyle: CSSProperties;
	displayComponent: any;
	direction: Direction;
}

export interface TransitionConf {
	totalDuration?: number;
	easing: string;
	direction?: Direction;
}

export default function useTransition(conf: TransitionConf, options?: any) {
	Object.assign(conf, { direction: Directions.next }, options);
}
