import { TransitionConf, TransitionProps } from '../types';

export interface ZipProps extends TransitionProps {}

export interface ZipConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
