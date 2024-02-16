import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionSlideOptions extends TransitionOptions {
	totalDuration?: number;
}

export interface TransitionSlideProps extends TransitionProps {
	options?: TransitionSlideOptions;
}

export interface TransitionSlideConf extends TransitionConf {
	totalDuration: number;
}
