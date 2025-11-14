import { Directions } from '../controllers/Player';
import type { TransitionConf } from './types';

export default function useTransition(conf: TransitionConf, options?: object) {
	Object.assign(conf, { direction: Directions.next }, options);
}
