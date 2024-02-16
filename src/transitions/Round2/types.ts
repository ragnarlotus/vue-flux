import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionRound2Options extends TransitionOptions {
	rows?: number;
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
	rotateX?: number;
}

export interface TransitionRound2Props extends TransitionProps {
	options?: TransitionRound2Options;
}

export interface TransitionRound2Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	rotateX: number;
}
