import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionBlinds3DOptions extends TransitionOptions {
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionBlinds3DProps extends TransitionProps {
	options?: TransitionBlinds3DOptions;
}

export interface TransitionBlinds3DConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
