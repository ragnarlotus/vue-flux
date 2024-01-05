import { CSSProperties } from 'vue';
import { TransitionConf, TransitionProps } from '../types';

export interface CameraProps extends TransitionProps {
	options: {
		circles?: number;
		totalDuration?: number;
		backgroundColor?: CSSProperties['color'];
		easing?: CSSProperties['animation-timing-function'];
	};
}

export interface CameraConf extends TransitionConf {
	circles: number;
	totalDuration: number;
	backgroundColor: CSSProperties['color'];
	easing: CSSProperties['animation-timing-function'];
}
