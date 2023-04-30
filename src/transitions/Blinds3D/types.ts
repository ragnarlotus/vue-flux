import { TransitionConf } from '../../mixins/transition';

export interface Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}
