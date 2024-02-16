import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionZipOptions extends TransitionOptions {
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionZipProps extends TransitionProps {
	options?: TransitionZipOptions;
}

export interface TransitionZipConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
