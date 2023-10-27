import { TransitionConf, TransitionProps } from '../types';

export interface Blinds3DProps extends TransitionProps {}

export interface Blinds3DConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
