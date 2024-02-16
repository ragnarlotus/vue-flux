import { CSSProperties } from 'vue';
import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionCameraOptions extends TransitionOptions {
	totalDuration?: number;
	backgroundColor?: CSSProperties['color'];
}

export interface TransitionCameraProps extends TransitionProps {
	options?: TransitionCameraOptions;
}

export interface TransitionCameraConf extends TransitionConf {
	totalDuration: number;
	backgroundColor: CSSProperties['color'];
}
