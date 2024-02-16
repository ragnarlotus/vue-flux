import { vi } from 'vitest';
import ResourceFactory from '../../../resources/__test__/ResourceFactory';
import ResourceLoader from '../ResourceLoader';
import Size from '../../Size/Size';

export default class ResourceLoaderFactory {
	static create(numResources: number, numToPreload: number) {
		const displaySize = new Size({
			width: 640,
			height: 360,
		});

		const onPreloadStart = vi.fn();
		const onPreloadEnd = vi.fn();
		const onLazyLoadStart = vi.fn();
		const onLazyLoadEnd = vi.fn();
		const reject = vi.fn();

		return new ResourceLoader(
			ResourceFactory.create(numResources),
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
