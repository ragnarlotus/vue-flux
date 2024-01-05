import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface Blinds2DProps extends TransitionProps {
	options: {
		rows?: number;
		cols?: number;
		tileDuration?: number;
		tileDelay?: number;
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface Blinds2DConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	easing: CSSProperties['animation-timing-function'];
}
