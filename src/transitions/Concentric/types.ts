import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface ConcentricProps extends TransitionProps {
	options: {
		circles?: number;
		tileDuration?: number;
		tileDelay?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface ConcentricConf extends TransitionConf {
	circles: number;
	tileDuration: number;
	tileDelay: number;
	easing: CSSProperties['animation-timing-function'];
}
