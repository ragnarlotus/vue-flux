import { Resource } from '../../resources';

export interface FluxParallaxProps {
	rsc: Resource;
	holder?: any;
	type?: 'visible' | 'relative' | 'fixed';
	offset?: string;
}
