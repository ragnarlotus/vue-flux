import { CSSProperties } from 'vue';
import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionWaveOptions extends TransitionOptions {
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
	sideColor?: CSSProperties['color'];
}

export interface TransitionWaveProps extends TransitionProps {
	options?: TransitionWaveOptions;
}

export interface TransitionWaveConf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
	sideColor: CSSProperties['color'];
}
