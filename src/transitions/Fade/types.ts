import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface FadeProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface FadeConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
