import { Directions } from '../controllers/Player';
import { TransitionConf } from './types';

export default function useTransition(conf: TransitionConf, options?: any) {
	Object.assign(conf, { direction: Directions.next }, options);
}
