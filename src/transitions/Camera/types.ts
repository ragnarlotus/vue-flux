import { CSSProperties } from 'vue';
import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionCameraOptions extends TransitionOptions {
	circles?: number;
	totalDuration?: number;
	backgroundColor?: CSSProperties['color'];
}

export interface TransitionCameraProps extends TransitionProps {
	options?: TransitionCameraOptions;
}

export interface TransitionCameraConf extends TransitionConf {
	circles: number;
	totalDuration: number;
	backgroundColor: CSSProperties['color'];
}
