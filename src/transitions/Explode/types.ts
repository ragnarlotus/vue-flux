import { TransitionConf, TransitionProps } from '../types';

export interface ExplodeProps extends TransitionProps {}

export interface ExplodeConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
