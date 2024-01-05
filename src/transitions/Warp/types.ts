import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface WarpProps extends TransitionProps {
	options: {
		circles?: number;
		tileDuration?: number;
		tileDelay?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface WarpConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
	easing: CSSProperties['animation-timing-function'];
}
