import { CSSProperties } from 'vue';
import { Resource } from '../../resources';
import { ComponentProps } from '../types';
import { Position } from '../../shared';

export interface FluxVortexProps extends ComponentProps {
	rsc: Resource;
	circles?: number;
	tileCss?: CSSProperties;
}

export interface FluxVortexCirclesProps {
	offset: Position;
	css: CSSProperties;
}
