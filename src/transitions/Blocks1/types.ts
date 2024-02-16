import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionBlocks1Options extends TransitionOptions {
	rows?: number;
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionBlocks1Props extends TransitionProps {
	options?: TransitionBlocks1Options;
}

export interface TransitionBlocks1Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
