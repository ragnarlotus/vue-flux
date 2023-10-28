import Resource from '../../resources/Resource';

export interface ResourceIndex {
	index: number;
	rsc: Resource;
	options: {
		delay?: number;
		stop?: boolean;
	};
}
