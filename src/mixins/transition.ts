import { Component, Ref } from 'vue';
import Size from '../shared/Size';
import Resource from '../resources/Resource';

export interface BaseProps {
	size?: Size;
	from: Resource;
	to?: Resource;
	current: any;

	options: {
		type: Object;
		default: () => {};
	};

	maskStyle: Object;

	displayComponent: Object;
}

export default (options, conf) => {
	Object.assign(conf, { direction: 'next' }, options);
};
