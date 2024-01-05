import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface KenburnProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface KenburnConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
