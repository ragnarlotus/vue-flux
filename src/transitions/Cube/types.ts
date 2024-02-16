import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionCubeOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionCubeProps extends TransitionProps {
	options?: TransitionCubeOptions;
}

export interface TransitionCubeConf extends TransitionConf {
	totalDuration: number;
}
