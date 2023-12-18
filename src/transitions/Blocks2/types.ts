import { TransitionConf, TransitionProps } from '../types';

export interface Blocks2Props extends TransitionProps {}

export interface Blocks2Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
