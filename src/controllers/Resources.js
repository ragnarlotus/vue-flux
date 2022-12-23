import { ref, shallowRef, toRaw } from 'vue';
import { ceil } from '../models/libs/math.js';

export default class Resources {
	ready = ref(false);
	list = [];
	current = shallowRef(null);
	last = null;

	setup(config, controller, display) {
		this.config = config;
		this.controller = controller;
		this.display = display;
	}

	getPrevIndex() {
		return this.last === null || this.last.index === 0
			? this.list.length - 1
			: this.last.index - 1;
	}

	getNextIndex() {
		return this.current.value.index >= this.list.length - 1
			? 0
			: this.current.value.index + 1;
	}

	getByIndex(index) {
		if (index === 'prev') {
			index = this.getPrevIndex();
		} else if (index === 'next') {
			index = this.getNextIndex();
		} else if (!this.list[index]) {
			throw new ReferenceError(`Image ${index} not found`);
		}

		return {
			index,
			rsc: this.list[index],
		};
	}

	reset() {
		this.ready.value = false;
		this.list.length = 0;
		this.current.value = null;
		this.last = null;

		this.loading = [];
		this.loadCounter = {
			success: 0,
			error: 0,
			total: 0,
		};
		this.progress = 0;

		this.isPreloading = false;
		this.numToPreload = 0;

		this.isLazyloading = false;
		this.numToLazyload = 0;
	}

	update(rscs) {
		this.reset();
		this.loading = [...toRaw(rscs)];

		this.numToPreload = this.config.lazyLoad
			? this.config.lazyLoadAfter
			: this.loading.length;

		if (this.numToPreload >= this.loading.length) {
			this.numToPreload = this.loading.length;
		} else {
			this.numToLazyload = this.loading.length - this.numToPreload;
		}

		this.preloadStart();
	}

	preloadStart() {
		this.isPreloading = true;

		const { loadCounter } = this;

		const numToLoad = this.numToPreload - loadCounter.success;

		this.loading
			.slice(loadCounter.total, loadCounter.total + numToLoad)
			.forEach((rsc, index) => this.load(rsc, index));
	}

	preloadEnd() {
		if (
			this.loadCounter.success < this.numToPreload &&
			this.loadCounter.total < this.numToPreload
		) {
			this.preloadStart();
			return;
		}

		this.isPreloading = false;

		this.list.splice(
			0,
			this.list.filter((rsc) => rsc.isLoaded())
		);

		this.current.value = this.getByIndex(0);

		if (this.loadCounter.total < this.loading.length) {
			this.lazyLoadStart();
		}

		this.ready.value = true;

		if (this.config.autoplay) {
			this.controller.play();
		}
	}

	lazyLoadStart() {
		this.isLazyloading = true;

		const load = this.loading.slice(this.loadCounter.total);
		const numPreloadedResources = this.list.length;

		load.forEach((rsc, index) =>
			this.load(rsc, numPreloadedResources + index)
		);
	}

	lazyLoadEnd() {
		this.lazyloading = false;
	}

	load(rsc, index) {
		rsc.load()
			.then(() => {
				this.loadSuccess(rsc, index);
			})
			.catch((error) => {
				this.loadError(error);
			})
			.finally(() => {
				this.loadCounter.total++;

				if (this.isPreloading) {
					this.updateProgress();
				}

				if (this.loadCounter.total === this.numToPreload) {
					this.preloadEnd();
				} else if (this.loadCounter.total === this.loading.length) {
					this.lazyLoadEnd();
				}
			});
	}

	loadSuccess(rsc, index) {
		this.loadCounter.success++;

		rsc.adaptToSize(this.display.size);

		this.list[index] = rsc;
	}

	loadError(error) {
		this.loadCounter.error++;

		// eslint-disable-next-line
		console.warn(error);
	}

	updateProgress() {
		this.progress =
			ceil((this.loadCounter.success * 100) / this.numToPreload) || 0;
	}

	getDirection(index) {
		if (['prev', 'next'].includes(index)) {
			return index;
		}

		return this.current.value.index < index ? 'next' : 'prev';
	}
}
