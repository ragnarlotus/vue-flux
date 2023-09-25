import { Ref, ref } from 'vue';
import { ceil } from './Maths';
import Size from './Size';
import { ResourceWithOptions } from '../components/VueFlux/types';

export default class ResourceLoader {
	rscs: ResourceWithOptions[] = [];
	counter = {
		success: 0,
		error: 0,
		total: 0,
	};
	toPreload: number;
	preloading: ResourceWithOptions[] = [];
	lazyloading: ResourceWithOptions[] = [];
	progress: Ref<number> = ref(0);
	displaySize: Size;
	onPreloadFinished: Function;
	onLazyloadFinished: Function;

	constructor(
		rscs: ResourceWithOptions[],
		toPreload: number,
		displaySize: Size,
		onPreloadFinished: Function,
		onLazyloadFinished: Function
	) {
		this.rscs = rscs;
		this.toPreload = toPreload > rscs.length ? rscs.length : toPreload;
		this.displaySize = displaySize;
		this.onPreloadFinished = onPreloadFinished;
		this.onLazyloadFinished = onLazyloadFinished;

		this.preloadStart();
	}

	preloadStart() {
		const { counter } = this;

		const toLoad = this.rscs.slice(
			counter.total,
			counter.total + this.toPreload - counter.success
		);

		this.preloading = this.preloading.concat(toLoad);

		toLoad.forEach((rsc) => this.load(rsc));
	}

	preloadEnd() {
		const { counter, toPreload } = this;

		if (counter.success < toPreload && counter.total < toPreload) {
			this.preloadStart();
			return;
		}

		const preloadedSuccessfully = this.preloading.filter((rsc) =>
			rsc.resource.isLoaded()
		);

		this.onPreloadFinished(preloadedSuccessfully);

		this.preloading.length = 0;

		if (counter.total < this.rscs.length) {
			this.lazyLoadStart();
		}
	}

	lazyLoadStart() {
		this.lazyloading = this.rscs.slice(this.counter.total);

		this.lazyloading.forEach((rsc) => this.load(rsc));
	}

	lazyLoadEnd() {
		const lazyloadedSuccessfully = this.lazyloading.filter((rsc) =>
			rsc.resource.isLoaded()
		);

		this.onLazyloadFinished(lazyloadedSuccessfully);

		this.lazyloading.length = 0;
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

				if (this.preloading.length !== 0) {
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
		console.warn(error);
	}

	updateProgress() {
		this.progress.value =
			ceil((this.counter.success * 100) / this.toPreload) || 0;
	}
}
