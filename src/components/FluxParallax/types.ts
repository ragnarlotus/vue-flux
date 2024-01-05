import { CSSProperties, type ComputedRef } from 'vue';
import { Resource } from '../../resources';

export interface FluxParallaxProps {
	rsc: Resource;
	holder?: Window | Element;
	type?: 'visible' | 'relative' | 'fixed';
	offset?: string;
}

export interface FluxParallaxStyles {
	base: CSSProperties;
	defined: CSSProperties;
	final: ComputedRef<CSSProperties>;
}

export interface DisplayProps {
	width: number;
	height: number;
	aspectRatio: number;
}

export interface ViewProps {
	top: number;
	width: number;
	height: number;
	aspectRatio: number;
}
