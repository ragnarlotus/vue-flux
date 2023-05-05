import { TransitionConf } from '../transition';

export interface Conf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
}
