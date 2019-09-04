export default class ImagesController {

	constructor(vf) {
		this.vf = vf;
		this.lastShown = undefined;
		this.time = undefined;

		this.reset();
	}

	get previous() {
		return this.props[this.previousIndex];
	}

	get current() {
		return this.props[this.currentIndex];
	}

	get next() {
		return this.props[this.getIndex('next')];
	}

	reset() {
		this.srcs = [];
		this.loading = [];
		this.props = [];

		this.loaded = 0;
		this.progress = 0;

		this.preloading = false;
		this.lazyloading = false;

		this.currentIndex = 0;
		this.previousIndex = undefined;
	}

	load() {
		this.reset();

		this.vf.$nextTick(() => {
			this.time = Date.now().toString();
			this.srcs = this.vf.images.slice(0);

			this.vf.loaded = false;

			this.preloadStart();
		});
	}

	preloadStart() {
		let preload;

		if (this.vf.config.lazyLoad)
			preload = this.vf.config.lazyLoadAfter || 0;

		this.loading = this.srcs.slice(0, preload);
		this.preloading = true;

		this.vf.$emit('images-preload-start');
	}

	preloadEnd() {
		this.preloading = false;

		if (this.loaded < this.srcs.length)
			this.lazyLoadStart();

		else
			this.loading = [];

		if (this.vf.loaded !== true)
			this.vf.init();

		this.vf.$emit('images-preload-end');
	}

	lazyLoadStart() {
		let remaining = this.srcs.slice(this.loaded);

		this.loading = this.loading.concat(remaining);

		this.lazyloading = true;

		this.vf.$emit('images-lazy-load-start');
	}

	lazyLoadEnd() {
		this.loading = [];
		this.lazyloading = false;

		this.vf.$emit('images-lazy-load-end');
	}

	addProperties(index, event) {
		let img = event.target || event.path[0];

		if (this.time !== img.attributes.time.nodeValue)
			return;

		this.loaded++;

		if (img.naturalWidth || img.width) {
			this.props[index] = {
				index,
				src: img.src,
				size: {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				},
			};

		} else {
			console.warn(`Image ${this.vf.images[index]} could not be loaded`);
		}

		if (index === 0 && !this.lastShown)
			this.updateLastShown(this.props[index]);

		if (this.preloading)
			this.updateProgress();

		if (this.loaded === this.loading.length)
			this.preloading? this.preloadEnd() : this.lazyLoadEnd();
	}

	updateProgress() {
		this.progress = Math.ceil(this.loaded * 100 / this.loading.length) || 0;
	}

	getIndex(index) {
		if (typeof index === 'number')
			return index;

		let { currentIndex } = this;

		if (index === 'previous')
			return currentIndex > 0? currentIndex - 1 : this.srcs.length - 1;

		return currentIndex + 1 < this.srcs.length? currentIndex + 1 : 0;
	}

	setCurrentIndex(index) {
		this.previousIndex = this.currentIndex;
		this.currentIndex = index;
	}

	updateLastShown(image) {
		this.lastShown = {
			...image,
		};
	}

}
