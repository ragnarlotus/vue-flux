import { ref } from 'vue';
import { ceil } from '../libs/Maths.js';

export default class ResourceLoader {
	rscs = [];
	counter = {
		success: 0,
		error: 0,
		total: 0,
	};
	toPreload = 0;
	preloading = [];
	lazyloading = [];
	progress = ref(0);

	constructor(
		rscs,
		toPreload,
		displaySize,
		progress,
		onPreloadFinished,
		onLazyloadFinished
	) {
		this.rscs = rscs;
		this.toPreload =
			toPreload >= this.rscs.length ? this.rscs.length : toPreload;
		this.displaySize = displaySize;
		this.progress = progress;
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
		if (
			this.counter.success < this.toPreload &&
			this.counter.total < this.toPreload
		) {
			this.preloadStart();
			return;
		}

		this.onPreloadFinished(this.preloading.filter((rsc) => rsc.isLoaded()));

		this.preloading.length = 0;

		if (this.counter.total < this.rscs.length) {
			this.lazyLoadStart();
		}
	}

	lazyLoadStart() {
		this.lazyloading = this.rscs.slice(this.counter.total);

		this.lazyloading.forEach((rsc) => this.load(rsc));
	}

	lazyLoadEnd() {
		this.onLazyloadFinished(this.lazyloading.filter((rsc) => rsc.isLoaded()));

		this.lazyloading.length = 0;
	}

	load(rsc) {
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

	loadSuccess(rsc) {
		this.counter.success++;

		rsc.adaptToSize(this.displaySize);
	}

	loadError(error) {
		this.counter.error++;

		// eslint-disable-next-line
		console.warn(error);
	}

	updateProgress() {
		this.progress.value =
			ceil((this.counter.success * 100) / this.toPreload) || 0;
	}
}
