import { TransitionConf, TransitionProps } from '../types';

export interface WaterfallProps extends TransitionProps {}

export interface WaterfallConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
