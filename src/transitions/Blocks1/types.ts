import { TransitionConf, TransitionProps } from '../types';

export interface Blocks1Props extends TransitionProps {}

export interface Blocks1Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
