import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionRound1Options extends TransitionOptions {
	rows?: number;
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionRound1Props extends TransitionProps {
	options?: TransitionRound1Options;
}

export interface TransitionRound1Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
