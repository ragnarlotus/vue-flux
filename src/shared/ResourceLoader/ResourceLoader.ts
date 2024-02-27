import { Ref, ref } from 'vue';
import { Size } from '../';
import { ResourceWithOptions } from '../../resources';

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
	onPreloadStart: () => void;
	onPreloadEnd: (loaded: ResourceWithOptions[]) => void;
	onLazyLoadStart: () => void;
	onLazyLoadEnd: (loaded: ResourceWithOptions[]) => void;
	isCancelled: boolean = false;
	reject: (message: string, rscs: ResourceWithOptions[]) => void;

	constructor(
		rscs: ResourceWithOptions[],
		toPreload: number,
		displaySize: Size,
		onPreloadStart: () => void,
		onPreloadEnd: (loaded: ResourceWithOptions[]) => void,
		onLazyLoadStart: () => void,
		onLazyLoadEnd: (loaded: ResourceWithOptions[]) => void,
		reject: (message: string, rscs: ResourceWithOptions[]) => void
	) {
		this.rscs = rscs;
		this.toPreload = toPreload > rscs.length ? rscs.length : toPreload;
		this.displaySize = displaySize;
		this.onPreloadStart = onPreloadStart;
		this.onPreloadEnd = onPreloadEnd;
		this.onLazyLoadStart = onLazyLoadStart;
		this.onLazyLoadEnd = onLazyLoadEnd;
		this.reject = reject;

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

		if (counter.success < toPreload && counter.total < this.rscs.length) {
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

				if (this.isCancelled) {
					return;
				}

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

		if (this.isCancelled) {
			return;
		}

		rsc.resource.displaySize.update(this.displaySize.toValue());
	}

	loadError(error: string) {
		this.counter.error++;

		if (this.isCancelled) {
			return;
		}

		// eslint-disable-next-line
		console.error(error);
	}

	updateProgress() {
		this.progress.value =
			Math.ceil((this.counter.success * 100) / this.toPreload) || 0;
	}

	hasFinished() {
		return this.counter.total === this.rscs.length;
	}

	cancel() {
		this.isCancelled = true;
		this.reject('Resources loading cancelled', this.rscs);
	}
}
