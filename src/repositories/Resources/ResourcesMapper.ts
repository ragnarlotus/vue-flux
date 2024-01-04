import { Resource, ResourceWithOptions } from '../../resources';

export default class ResourcesMapper {
	static withOptions(rscs: (Resource | ResourceWithOptions)[]) {
		return rscs.map((rsc) => {
			let resource = rsc;
			let options = {};

			if ('resource' in rsc) {
				resource = rsc.resource as Resource;

				if ('options' in rsc) {
					options = rsc.options as object;
				}
			}

			return { resource, options } as ResourceWithOptions;
		});
	}
}
