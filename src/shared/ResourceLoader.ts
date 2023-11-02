import { Ref, ref } from 'vue';
import { ceil } from './Maths';
import Size from './Size';
import { ResourceWithOptions } from '../resources';

export default class ResourceLoader {
	rscs: ResourceWithOptions[] = [];
	counter = {
		success: 0,
		error: 0,
		total: 0,
	};
	toPreload: number;
	preLoading: ResourceWithOptions[] = [];
	lazyLoading: ResourceWithOptions[] = [];
	progress: Ref<number> = ref(0);
	displaySize: Size;
	onPreloadStart: Function;
	onPreloadEnd: Function;
	onLazyLoadStart: Function;
	onLazyLoadEnd: Function;

	constructor(
		rscs: ResourceWithOptions[],
		toPreload: number,
		displaySize: Size,
		onPreloadStart: Function,
		onPreloadEnd: Function,
		onLazyLoadStart: Function,
		onLazyLoadEnd: Function
	) {
		this.rscs = rscs;
		this.toPreload = toPreload > rscs.length ? rscs.length : toPreload;
		this.displaySize = displaySize;
		this.onPreloadStart = onPreloadStart;
		this.onPreloadEnd = onPreloadEnd;
		this.onLazyLoadStart = onLazyLoadStart;
		this.onLazyLoadEnd = onLazyLoadEnd;

		this.preloadStart();
	}

	preloadStart() {
		this.onPreloadStart();

		const { counter } = this;

		const toLoad = this.rscs.slice(
			counter.total,
			counter.total + this.toPreload - counter.success
		);

		this.preLoading = this.preLoading.concat(toLoad);

		toLoad.forEach((rsc) => this.load(rsc));
	}

	preloadEnd() {
		const { counter, toPreload } = this;

		if (counter.success < toPreload && counter.total < toPreload) {
			this.preloadStart();
			return;
		}

		const preloadedSuccessfully = this.preLoading.filter((rsc) =>
			rsc.resource.isLoaded()
		);

		this.onPreloadEnd(preloadedSuccessfully);

		this.preLoading.length = 0;

		if (counter.total < this.rscs.length) {
			this.lazyLoadStart();
		}
	}

	lazyLoadStart() {
		this.onLazyLoadStart();

		this.lazyLoading = this.rscs.slice(this.counter.total);

		this.lazyLoading.forEach((rsc) => this.load(rsc));
	}

	lazyLoadEnd() {
		const lazyLoadedSuccessfully = this.lazyLoading.filter((rsc) =>
			rsc.resource.isLoaded()
		);

		this.onLazyLoadEnd(lazyLoadedSuccessfully);

		this.lazyLoading.length = 0;
	}

	load(rsc: ResourceWithOptions) {
		rsc.resource
			.load()
			.then(() => {
				this.loadSuccess(rsc);
			})
			.catch((error) => {
				this.loadError(error);
			})
			.finally(() => {
				this.counter.total++;

				if (this.preLoading.length !== 0) {
					this.updateProgress();
				}

				if (this.counter.total === this.toPreload) {
					this.preloadEnd();
				} else if (this.counter.total === this.rscs.length) {
					this.lazyLoadEnd();
				}
			});
	}

	loadSuccess(rsc: ResourceWithOptions) {
		this.counter.success++;

		rsc.resource.displaySize.update(this.displaySize.toRaw());
	}

	loadError(error: string) {
		this.counter.error++;

		// eslint-disable-next-line
		console.error(error);
	}

	updateProgress() {
		this.progress.value =
			ceil((this.counter.success * 100) / this.toPreload) || 0;
	}
}
