import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionConcentricOptions extends TransitionOptions {
	circles?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionConcentricProps extends TransitionProps {
	options?: TransitionConcentricOptions;
}

export interface TransitionConcentricConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
}
