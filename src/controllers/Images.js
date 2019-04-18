export default class ImagesController {

	constructor(vf) {
		this.vf = vf;

		this.count = 0;
		this.loading = [];
		this.loaded = 0;
		this.props = [];
		this.currentIndex = 0;
	}

	get current() {
		return this.props[this.currentIndex];
	}

	get next() {
		return this.props[this.getIndex('next')];
	}

	preload() {
		let vf = this.vf;

		this.loading = vf.images.slice(0);
		this.count = this.loading.length || 0;
		this.loaded = 0;
		this.props = [];

		vf.loaded = false;
	}

	add(index) {
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
			console.warn('Image '+ vf.images[index] +' could not be loaded');
		}

		if (this.loaded === this.loading.length) {
			this.loading = [];

			if (vf.loaded !== true)
				vf.init();
		}
	}

	getIndex(index) {
		if (typeof index === 'number')
			return index;

		currentIndex = this.currentIndex;

		if (index === 'previous')
			return currentIndex > 0? currentIndex - 1 : this.count - 1;

		return currentIndex + 1 < this.count? currentIndex + 1 : 0;
	}

	show(index, transition) {
		let vf = this.vf;

		vf.Timers.clear('image');

		vf.Transitions.run(transition);

		vf.$nextTick(() => {
			this.current = this.getIndex(index);
		});
	}

}
