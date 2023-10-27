import { CSSProperties } from 'vue';
import { Resource } from '../../resources';
import { ComponentProps } from '../types';

export interface FluxVortexProps extends ComponentProps {
	rsc: Resource;
	circles?: number;
	tileCss?: CSSProperties;
}
