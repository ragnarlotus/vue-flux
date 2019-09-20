export default class ImagesController {

	constructor(vf) {
		this.vf = vf;
		this.reset(true);
	}

	get previous() {
		let index = this.$current.index - 1;

		if (index < 0)
			index = this.props.length - 1;

		return this.props[index];
	}

	get last() {
		return this.$last;
	}

	set last(image) {
		this.$last = { ...image };
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

		if (index >= this.props.length)
			index = 0;

		return this.props[index];
	}

	reset(hard = false) {
		if (hard)
			this.$last = undefined;

		this.srcs = [];
		this.loading = [];
		this.props = [];

		this.loaded = 0;
		this.progress = 0;

		this.preloading = false;
		this.lazyloading = false;

		this.current = undefined;
	}

	update(images) {
		this.reset();

		this.time = Date.now().toString();
		this.srcs = images.slice(0);

		this.preloadStart();
	}

	preloadStart() {
		let preload = this.srcs.length;

		if (this.vf.config.lazyLoad)
			preload = this.vf.config.lazyLoadAfter;

		this.loading = this.srcs.slice(0, preload);
		this.preloading = true;

		this.vf.$emit('images-preload-start');
	}

	preloadEnd() {
		this.preloading = false;

		this.vf.$emit('images-preload-end');

		if (this.loaded < this.srcs.length)
			this.lazyLoadStart();

		else
			this.loading = [];

		this.vf.init();
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
			console.warn(`Image ${this.srcs[index]} could not be loaded`);
		}

		if (index === 0)
			this.last = this.current = this.props[0];

		if (this.preloading)
			this.updateProgress();

		if (this.loaded === this.loading.length)
			this.preloading? this.preloadEnd() : this.lazyLoadEnd();
	}

	updateProgress() {
		this.progress = Math.ceil(this.loaded * 100 / this.loading.length) || 0;
	}

	getByIndex(index) {
		if (index === 'next')
			return this.next;

		if (index === 'previous')
			return this.previous;

		if (!this.props[index])
			throw new ReferenceError(`Image ${index} not found`);

		return this.props[index];
	}

}
