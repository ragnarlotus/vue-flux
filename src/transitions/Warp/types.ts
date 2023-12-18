import { TransitionConf, TransitionProps } from '../types';

export interface WarpProps extends TransitionProps {}

export interface WarpConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
}
