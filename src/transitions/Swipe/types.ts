import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionSwipeOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionSwipeProps extends TransitionProps {
	options?: TransitionSwipeOptions;
}

export interface TransitionSwipeConf extends TransitionConf {
	totalDuration: number;
}
