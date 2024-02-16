import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionWarpOptions extends TransitionOptions {
	circles?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionWarpProps extends TransitionProps {
	options?: TransitionWarpOptions;
}

export interface TransitionWarpConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
}
