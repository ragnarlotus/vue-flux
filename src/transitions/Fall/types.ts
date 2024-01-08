import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionFallOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionFallProps extends TransitionProps {
	options?: TransitionFallOptions;
}

export interface TransitionFallConf extends TransitionConf {
	totalDuration: number;
}
