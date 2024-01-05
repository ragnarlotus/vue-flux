import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface FallProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface FallConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
