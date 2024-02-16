import { Img, type ResourceWithOptions } from '../../resources';
import ResourcesMapper from './ResourcesMapper';

describe('repositories: ResourcesMapper', () => {
	it('turns all the transitions array as transitions with options', () => {
		const resources = [
			new Img('url1'),
			{
				resource: new Img('url2'),
				options: {
					delay: 8000,
				},
			} as ResourceWithOptions,
			new Img('url3'),
		];

		const resourcesWithOptions = ResourcesMapper.withOptions(resources);

		expect(resourcesWithOptions[0].resource).toBe(resources[0]);
		expect(resourcesWithOptions[1].resource).toBe(resources[1].resource);
		expect(resourcesWithOptions[1].options.delay).toBe(8000);
		expect(resourcesWithOptions[2].resource).toBe(resources[2]);
		expect(resourcesWithOptions[2].options).toStrictEqual({});
	});
});
