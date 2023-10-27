import { TransitionConf, TransitionProps } from '../types';

export interface ConcentricProps extends TransitionProps {}

export interface ConcentricConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
}
