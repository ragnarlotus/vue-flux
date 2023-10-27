import { TransitionConf, TransitionProps } from '../types';

export interface Blinds2DProps extends TransitionProps {}

export interface Blinds2DConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
