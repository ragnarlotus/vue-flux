import { TransitionConf, TransitionProps } from '../types';

export interface Round2Props extends TransitionProps {}

export interface Round2Conf extends TransitionConf {
	rows: number | null;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	rotateX: number;
}
