import Img from '../models/resources/Img';

export default class ResourcesController {
	$current;
	$last;

	constructor(vf) {
		this.vf = vf;
		this.reset(true);
	}

	get prev() {
		let index = this.$current.index - 1;

		if (index < 0)
			index = this.imgs.length - 1;

		return this.imgs[index];
	}

	get last() {
		return this.$last;
	}

	set last(image) {
		this.$last = image;
	}

	get current() {
		return this.$current;
	}

	set current(image) {
		if (this.$current)
			this.last = this.$current;

		this.$current = image;
	}

	get next() {
		let index = this.$current.index + 1;

		if (index >= this.imgs.length)
			index = 0;

		return this.imgs[index];
	}

	reset(hard = false) {
		if (hard)
			this.$last = undefined;

		this.srcs = [];
		this.imgs = [];
		this.loading = [];

		this.loaded = {
			current: 0,
			success: 0,
			error: 0,
			total: 0,
		};
		this.progress = 0;

		this.toPreload = 0;
		this.toLazyload = 0;

		this.preloading = false;
		this.lazyloading = false;

		this.$current = undefined;
	}

	update(srcs) {
		this.reset();

		this.srcs = [...srcs];

		const { config } = this.vf;

		this.toPreload = config.lazyLoad? config.lazyLoadAfter : this.srcs.length;

		if (this.toPreload >= this.srcs.length) {
			this.toPreload = this.srcs.length;
		} else {
			this.toLazyload = this.srcs.length - this.toPreload;
		}

		this.preloadStart();
	}

	preloadStart() {
		const { vf, loaded } = this;

		this.preloading = true;
		vf.$emit('images-preload-start');

		const toLoad = this.toPreload - loaded.success;
		this.loading = this.srcs.slice(loaded.total, loaded.total + toLoad);

		this.loaded.current = 0;
		this.loading.forEach((src, i) => this.addImg(src, i, loaded.total));
	}

	preloadEnd() {
		const { vf } = this;

		this.addLoadedSuccessfully();

		if (this.loaded.success < this.toPreload && this.loaded.total < this.toPreload)
			return this.preloadStart();

		this.updateIndexes();

		this.preloading = false;
		vf.$emit('images-preload-end');

		if (this.loaded.total < this.srcs.length)
			this.lazyLoadStart();

		vf.init();
	}

	lazyLoadStart() {
		const { vf, loaded } = this;

		this.lazyloading = true;
		vf.$emit('images-lazy-load-start');

		this.loading = this.srcs.slice(loaded.total);
		this.loaded.current = 0;
		this.loading.forEach((src, i) => this.addImg(src, i, loaded.total));
	}

	lazyLoadEnd() {
		this.addLoadedSuccessfully();
		this.updateIndexes();

		this.lazyloading = false;
		this.vf.$emit('images-lazy-load-end');
	}

	addImg(src, i, totalLoaded) {
		const { config } = this.vf;
		const img = this.loading[i] = new Img(config.path + src, i + totalLoaded);

		return img.load().then(() => {
			this.loadSuccess(img);

		}).catch(error => {
			this.loadError(error);

		}).finally(() => {
			this.loaded.current++;
			this.loaded.total++;

			if (this.preloading)
				this.updateProgress();

			if (this.loaded.current === this.loading.length)
				this.preloading? this.preloadEnd() : this.lazyLoadEnd();
		});
	}

	loadSuccess() {
		this.loaded.success++;

		if (this.preloading && !this.current) {
			for (const img of this.loading) {
				if (img.status === 'error')
					continue;

				if (img.status === 'loaded')
					this.current = img;

				break;
			}
		}
	}

	loadError(error) {
		this.loaded.error++;

		// eslint-disable-next-line
		console.warn(error);
	}

	updateProgress() {
		this.progress = Math.ceil(this.loaded.success * 100 / this.toPreload) || 0;
	}

	addLoadedSuccessfully() {
		const loaded = this.loading.filter(img => img.status === 'loaded');

		this.imgs.push(...loaded)

		this.loading = [];
		this.loaded.current = 0;
	}

	updateIndexes() {
		this.imgs.forEach((img, i) => img.index = i);
	}

	getByIndex(index) {
		if (index === 'next')
			return this.next;

		if (index === 'prev')
			return this.prev;

		if (!this.imgs[index])
			throw new ReferenceError(`Image ${index} not found`);

		return this.imgs[index];
	}

}
