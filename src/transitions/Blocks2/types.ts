import { CSSProperties } from 'vue';
import { Resource } from '../../resources';
import { TransitionConf, TransitionOptions, TransitionProps } from '../types';

export interface TransitionBlocks2Options extends TransitionOptions {
	rows?: number;
	cols?: number;
	tileDuration?: number;
	tileDelay?: number;
}

export interface TransitionBlocks2Props extends TransitionProps {
	options?: TransitionBlocks2Options;
}

export interface TransitionBlocks2Conf extends TransitionConf {
	rows: number;
	cols: number;
	tileDuration: number;
	tileDelay: number;
}

export interface BackgroundProps {
	rsc: null | Resource;
	css: CSSProperties;
}
