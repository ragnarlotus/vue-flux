import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface BookProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface BookConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
