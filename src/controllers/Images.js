export default class ImagesController {

	constructor(vf) {
		this.vf = vf;

		this.srcs = [];
		this.loading = [];
		this.props = [];

		this.preloading = false;
		this.lazyloading = false;

		this.currentIndex = 0;
		this.previousIndex = undefined;

		this.lastShown = undefined;
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

	load(images) {
		this.srcs = this.vf.images.slice(0);
		this.props = [];

		this.vf.loaded = false;

		this.preloadStart();
	}

	preloadStart() {
		let preload;

		if (this.vf.config.lazyLoad)
			preload = this.vf.config.lazyLoadAfter;

		this.loading = this.srcs.slice(0, preload);
		this.preloading = true;

		this.vf.$emit('images-preload-start');
	}

	preloadEnd() {
		this.preloading = false;

		if (this.props.length < this.srcs.length)
			this.lazyLoadStart();

		else
			this.loading = [];

		if (this.vf.loaded !== true)
			this.vf.init();

		this.vf.$emit('images-preload-end');
	}

	lazyLoadStart() {
		let remaining = this.srcs.slice(this.props.length);

		this.loading = this.loading.concat(remaining);

		this.lazyloading = true;

		this.vf.$emit('images-lazy-load-start');
	}

	lazyLoadEnd() {
		this.loading = [];
		this.lazyloading = false;

		this.vf.$emit('images-lazy-load-end');
	}

	addProperties(index) {
		let vf = this.vf;

		let img = vf.$refs.loading[index];

		if (img.naturalWidth || img.width) {
			this.props[index] = {
				index: index,
				src: img.src,
				size: {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				},
			};

		} else {
			console.warn(`Image ${vf.images[index]} could not be loaded`);
		}

		if (this.props.length === this.loading.length) {
			if (this.preloading)
				this.preloadEnd();

			else if (this.lazyloading)
				this.lazyLoadEnd();
		}
	}

	getIndex(index) {
		if (typeof index === 'number')
			return index;

		let currentIndex = this.currentIndex;

		if (index === 'previous')
			return currentIndex > 0? currentIndex - 1 : this.srcs.length - 1;

		return currentIndex + 1 < this.srcs.length? currentIndex + 1 : 0;
	}

	show(index, transition) {
		this.vf.Timers.clear('image');

		index = this.getIndex(index);

		if (!this.props[index])
			return;

		this.previousIndex = this.currentIndex;
		this.currentIndex = this.getIndex(index);

		this.lastShown = {
			...this.current,
		};

		this.vf.Transitions.run(transition);
	}

}
