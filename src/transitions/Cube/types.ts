import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface CubeProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface CubeConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
