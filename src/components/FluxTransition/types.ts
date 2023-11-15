import { Resource } from '../../resources';
import { Size } from '../../shared';

export interface FluxTransitionProps {
	size: Size;
	transition: Object;
	from: Resource;
	to: Resource;
	displayComponent?: null | any;
	options?: Object;
}
