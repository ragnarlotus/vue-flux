import { TransitionConf } from '../transition';

export interface Conf extends TransitionConf {
	rows: null | number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
