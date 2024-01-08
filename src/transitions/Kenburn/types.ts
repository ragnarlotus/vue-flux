import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionKenburnOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionKenburnProps extends TransitionProps {
	options?: TransitionKenburnOptions;
}

export interface TransitionKenburnConf extends TransitionConf {
	totalDuration: number;
}
