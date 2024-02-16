import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionBookOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionBookProps extends TransitionProps {
	options?: TransitionBookOptions;
}

export interface TransitionBookConf extends TransitionConf {
	totalDuration: number;
}
