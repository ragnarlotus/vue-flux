import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionExplodeOptions extends TransitionOptions {
	rows?: number;
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionExplodeProps extends TransitionProps {
	options?: TransitionExplodeOptions;
}

export interface TransitionExplodeConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
