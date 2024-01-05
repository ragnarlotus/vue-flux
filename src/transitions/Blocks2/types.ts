import { CSSProperties } from 'vue';
import { Resource } from '../../resources';
import { TransitionConf, TransitionProps } from '../types';

export interface Blocks2Props extends TransitionProps {
	options?: Blocks2Conf;
}

export interface Blocks2Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}

export interface BackgroundProps {
	rsc: null | Resource;
	css: CSSProperties;
}
