import { Ref, ref } from 'vue';
import { ceil } from './Maths';
import Resource from '../resources/Resource';
import Size from './Size';

export default class ResourceLoader {
	rscs: Resource[] = [];
	counter = {
		success: 0,
		error: 0,
		total: 0,
	};
	toPreload: number;
	preloading: Resource[] = [];
	lazyloading: Resource[] = [];
	progress: Ref<number> = ref(0);
	displaySize: Size;
	onPreloadFinished: Function;
	onLazyloadFinished: Function;

	constructor(
		rscs: Resource[],
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
			rsc.isLoaded()
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
			rsc.isLoaded()
		);

		this.onLazyloadFinished(lazyloadedSuccessfully);

		this.lazyloading.length = 0;
	}

	load(rsc: Resource) {
		rsc.load()
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

	loadSuccess(rsc: Resource) {
		this.counter.success++;

		rsc.adaptToSize(this.displaySize);
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
