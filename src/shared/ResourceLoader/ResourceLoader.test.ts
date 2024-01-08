import ResourceLoader from './ResourceLoader';
import { Size } from '../';
import {
	ResizeTypes,
	Resource,
	ResourceWithOptions,
	Statuses,
} from '../../resources';
import { vi } from 'vitest';
import { FluxImage } from '../../components';

class ResourceMock extends Resource {
	constructor() {
		super(
			'',
			'',
			ResizeTypes.fill,
			null,
			{ component: FluxImage, props: {} },
			{ component: FluxImage, props: {} },
			''
		);
	}

	load = vi.fn().mockImplementation(() => {
		return new Promise<void>((resolve) => {
			this.status.value = Statuses.loading;
			setTimeout(resolve, 50);
		});
	});

	onLoad = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_el: unknown, _resolve: () => void) => {});

	onError = vi
		.fn()
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		.mockImplementation((_reject: (message: string) => void) => {});
}

function resourceFactory(numResources: number) {
	return new Array(numResources).fill({
		resource: new ResourceMock(),
		options: {},
	} as ResourceWithOptions);
}

describe('shared: ResourceLoader', () => {
	let rscLoader: ResourceLoader;

	const displaySize = new Size({
		width: 640,
		height: 360,
	});

	const onPreloadStart = vi.fn();
	const onPreloadEnd = vi.fn();
	const onLazyLoadStart = vi.fn();
	const onLazyLoadEnd = vi.fn();
	const reject = vi.fn();

	function rscLoaderCreator(numResources: number, numToPreload: number) {
		return new ResourceLoader(
			resourceFactory(numResources),
			numToPreload,
			displaySize,
			onPreloadStart,
			onPreloadEnd,
			onLazyLoadStart,
			onLazyLoadEnd,
			reject
		);
	}

	beforeEach(() => {
		onPreloadStart.mockReset();
		onPreloadEnd.mockReset();
		onLazyLoadStart.mockReset();
		onLazyLoadEnd.mockReset();
		reject.mockReset();
	});

	it('calls onPreloadStart when preload starts', () => {
		rscLoader = rscLoaderCreator(10, 15);

		expect(rscLoader.onPreloadStart).toHaveBeenCalledWith();
	});

	it('preloads all resources if num resources less than num to preload', () => {
		rscLoader = rscLoaderCreator(10, 15);

		expect(rscLoader.toPreload).toBe(10);
	});

	it('start preloading when created', () => {
		rscLoader = rscLoaderCreator(10, 10);
		expect(rscLoader.onPreloadStart).toHaveBeenCalledWith();
	});

	it('start preloading the resources', () => {
		rscLoader = rscLoaderCreator(15, 10);

		expect(
			rscLoader.rscs.every(
				(rsc) => rsc.resource.status.value === Statuses.loading
			)
		).toBeTruthy();
	});

	/* 	it.skip('calls onPreloadEnd when preload finishes', () =>
		new Promise((resolve) => {
			onPreloadEnd.mockImplementation(() => {
				expect(
					rscLoader.rscs.every(
						(rsc) => rsc.resource.status.value === Statuses.loaded
					)
				).toBeTruthy();

				resolve({});
			});

			rscLoader = rscLoaderCreator(15, 10);
		})); */
});
