import { vi } from 'vitest';
import ResourceLoader from './ResourceLoader';
import ResourceLoaderFactory from './__test__/ResourceLoaderFactory';
import { Statuses } from '../../resources';

vi.mock('../../resources/Img/Img');

describe('shared: ResourceLoader', () => {
	let rscLoader: ResourceLoader;

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('calls onPreloadStart when preload starts', () => {
		rscLoader = ResourceLoaderFactory.create(10, 5);

		expect(rscLoader.onPreloadStart).toHaveBeenCalledOnce();
	});

	it('preloads all resources if num resources less than num to preload', () => {
		rscLoader = ResourceLoaderFactory.create(10, 15);

		expect(rscLoader.toPreload).toBe(10);
	});

	it('start preloading when created', () => {
		rscLoader = ResourceLoaderFactory.create(10, 10);

		expect(rscLoader.onPreloadStart).toHaveBeenCalledOnce();
	});

	it('start preloading the resources', () => {
		rscLoader = ResourceLoaderFactory.create(15, 10);

		expect(
			rscLoader.rscs.every((rsc) =>
				[Statuses.loading, Statuses.loaded].includes(
					rsc.resource.status.value
				)
			)
		).toBeTruthy();
	});

	it('checks if resources preloaded are less than to preload and preloads the remaining', () => {
		rscLoader = ResourceLoaderFactory.create(15, 6);

		rscLoader.counter.success = 4;
		rscLoader.counter.error = 2;
		rscLoader.counter.total = 6;

		rscLoader.preloadEnd();

		expect(rscLoader.preLoading).toHaveLength(8);
	});

	it('calls onPreloadEnd when all preloaded', () =>
		new Promise<void>((done) => {
			rscLoader = ResourceLoaderFactory.create(5, 5, undefined, () => {
				expect(rscLoader.onPreloadStart).toHaveBeenCalledOnce();
				expect(rscLoader.onPreloadEnd).toHaveBeenCalledWith(
					expect.any(Array)
				);
				done();
			});
		}));

	it('starts lazy loading when preloading finish', () =>
		new Promise<void>((done) => {
			rscLoader = ResourceLoaderFactory.create(
				20,
				5,
				undefined,
				undefined,
				() => {
					expect(rscLoader.onPreloadStart).toHaveBeenCalledOnce();
					expect(rscLoader.onPreloadEnd).toHaveBeenCalledOnce();
					expect(rscLoader.counter.total).toBe(5);
					expect(rscLoader.onLazyLoadStart).toHaveBeenCalledOnce();
					done();
				}
			);
		}));

	it('calls onLazyLoadEnd when lazy loading finish', () =>
		new Promise<void>((done) => {
			rscLoader = ResourceLoaderFactory.create(
				20,
				5,
				undefined,
				undefined,
				undefined,
				() => {
					expect(rscLoader.onPreloadStart).toHaveBeenCalledOnce();
					expect(rscLoader.onPreloadEnd).toHaveBeenCalledOnce();
					expect(rscLoader.onLazyLoadStart).toHaveBeenCalledOnce();
					expect(rscLoader.onLazyLoadEnd).toHaveBeenCalledWith(
						expect.any(Array)
					);
					expect(rscLoader.counter.total).toBe(20);
					done();
				}
			);
		}));
});
