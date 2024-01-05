import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface ZipProps extends TransitionProps {
	options: {
		rows?: number;
		cols?: number;
		tileDuration?: number;
		tileDelay?: number;
		easing: CSSProperties['animation-timing-function'];
	};
}

export interface ZipConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	easing: CSSProperties['animation-timing-function'];
}
