import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionWaterfallOptions extends TransitionOptions {
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionWaterfallProps extends TransitionProps {
	options?: TransitionWaterfallOptions;
}

export interface TransitionWaterfallConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
