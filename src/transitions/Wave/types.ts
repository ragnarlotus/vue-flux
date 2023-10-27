import { TransitionConf, TransitionProps } from '../types';

export interface WaveProps extends TransitionProps {}

export interface WaveConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	sideColor: string;
}
