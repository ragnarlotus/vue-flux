import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface SlideProps extends TransitionProps {
	options: {
		totalDuration?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface SlideConf extends TransitionConf {
	totalDuration: number;
	easing: CSSProperties['animation-timing-function'];
}
