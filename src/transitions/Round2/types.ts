import { TransitionConf } from '../../mixins/transition';

export interface Conf extends TransitionConf {
	rows: number | null;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	rotateX: number;
}
