import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionBlinds2DOptions extends TransitionOptions {
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionBlinds2DProps extends TransitionProps {
	options?: TransitionBlinds2DOptions;
}

export interface TransitionBlinds2DConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
