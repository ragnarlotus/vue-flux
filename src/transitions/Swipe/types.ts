import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface SwipeProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface SwipeConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
