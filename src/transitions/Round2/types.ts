import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface Round2Props extends TransitionProps {
	options: {
		rows?: number;
		cols?: number;
		tileDuration?: number;
		tileDelay?: number;
		rotateX?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface Round2Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	rotateX: number;
	easing: CSSProperties['animation-timing-function'];
}
