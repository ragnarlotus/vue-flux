import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionFadeOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionFadeProps extends TransitionProps {
	options?: TransitionFadeOptions;
}

export interface TransitionFadeConf extends TransitionConf {
	totalDuration: number;
}
