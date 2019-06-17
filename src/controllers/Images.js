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

		this.preload();
	}

	preload() {
		let preload;

		if (this.vf.config.lazyLoad)
			preload = this.vf.config.lazyLoadAfter;

		this.loading = this.srcs.slice(0, preload);
		this.preloading = true;
	}

	lazyLoad() {
		if (this.props.length === this.srcs.length)
			return;

		this.loading = this.srcs.slice(this.props.length - 1);

		this.lazyloading = true;
	}

	addProperties(index) {
		this.loaded++;

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

		if (this.props.length === this.loading.length && this.preloading) {
			this.loading = [];
			this.preloading = false;

			if (vf.loaded !== true)
				vf.init();

			this.lazyLoad();

		} else if (this.props.length === this.srcs.length && this.lazyloading) {
			this.loading = [];
			this.lazyloading = false;
		}
	}

	getIndex(index) {
		if (typeof index === 'number')
			return index;

		let currentIndex = this.currentIndex;

		if (index === 'previous')
			return currentIndex > 0? currentIndex - 1 : this.count - 1;

		return currentIndex + 1 < this.count? currentIndex + 1 : 0;
	}

	show(index, transition) {
		this.vf.Timers.clear('image');

		this.previousIndex = this.currentIndex;
		this.currentIndex = this.getIndex(index);

		this.vf.Transitions.run(transition);
	}

}
