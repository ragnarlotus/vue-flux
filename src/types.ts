/* eslint-disable no-unused-vars */
import { CSSProperties } from 'vue';

export interface ComponentStyles {
	base?: CSSProperties;
	color?: CSSProperties;
	rsc?: CSSProperties;
	inherited?: CSSProperties;
	size?: CSSProperties;
}

export interface Offset {
	top: number;
	left: number;
}

export type OrderParameter = 'prev' | 'next';
