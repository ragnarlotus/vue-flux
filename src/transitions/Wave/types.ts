import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface WaveProps extends TransitionProps {
	options: {
		rows?: number;
		cols?: number;
		tileDuration?: number;
		tileDelay?: number;
		sideColor?: CSSProperties['color'];
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface WaveConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	sideColor: CSSProperties['color'];
	easing: CSSProperties['animation-timing-function'];
}
