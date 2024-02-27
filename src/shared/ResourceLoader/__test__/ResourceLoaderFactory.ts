import { vi } from 'vitest';
import ResourceFactory from '../../../resources/__test__/ResourceFactory';
import ResourceLoader from '../ResourceLoader';
import Size from '../../Size/Size';
import { ResourceWithOptions } from '../../../resources/types';

export default class ResourceLoaderFactory {
	static create(
		numResources: number,
		numToPreload: number,
		preloadStartMock?: () => void,
		preloadEndMock?: () => void,
		lazyLoadStartMock?: () => void,
		lazyLoadEndMock?: () => void
	) {
		const displaySize = new Size({
			width: 640,
			height: 360,
		});

		const onPreloadStart = vi.fn();

		if (preloadStartMock) {
			onPreloadStart.mockImplementation(preloadStartMock);
		}

		const onPreloadEnd = vi.fn();

		if (preloadEndMock) {
			onPreloadEnd.mockImplementation(preloadEndMock);
		}

		const onLazyLoadStart = vi.fn();

		if (lazyLoadStartMock) {
			onLazyLoadStart.mockImplementation(lazyLoadStartMock);
		}

		const onLazyLoadEnd = vi.fn();

		if (lazyLoadEndMock) {
			onLazyLoadEnd.mockImplementation(lazyLoadEndMock);
		}

		const reject = vi.fn();

		const resources = ResourceFactory.create(numResources).map((resource) => {
			return {
				resource: resource,
				options: {},
			} as ResourceWithOptions;
		});

		return new ResourceLoader(
			resources,
			numToPreload,
			displaySize,
			onPreloadStart,
			onPreloadEnd,
			onLazyLoadStart,
			onLazyLoadEnd,
			reject
		);
	}
}
