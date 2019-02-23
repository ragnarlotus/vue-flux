export default class ImagesController {

	constructor(vf) {
		this.vf = vf;

		this.count = 0;
		this.loading = [];
		this.loaded = 0;
		this.props = [];
	}

	get current() {
		let refs = this.vf.$refs;

		if (refs.image1 === undefined)
			return undefined;

		return refs.image2.style.zIndex === 11? refs.image2 : refs.image1;
	}

	get next() {
		let refs = this.vf.$refs;

		return refs.image1.style.zIndex === 10? refs.image1 : refs.image2;
	}

	preload() {
		let vf = this.vf;

		this.loading = vf.images.slice(0);
		this.count = this.loading.length || 0;
		this.loaded = 0;
		this.props = [];

		if (this.count < 2 || vf.Transitions.count === 0)
			return;

		vf.loaded = false;
	}

	add(index) {
		this.loaded++;

		let vf = this.vf;
		let img = vf.$refs.loading[index];

		if (img.naturalWidth || img.width) {
			this.props[index] = {
				src: img.src,
				size: {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height
				}
			};

		} else {
			console.warn('Image '+ vf.images[index] +' could not be loaded');
		}

		if (index === 0 && this.props[0]) {
			vf.$refs.image1.index = 0;
			vf.$refs.image1.setImageSrc(this.props[0].src);
			vf.$refs.image1.setImageSize(this.props[0].size);
		}

		if (index === 1 && this.props[1]) {
			vf.$refs.image2.index = 1;
			vf.$refs.image2.setImageSrc(this.props[1].src);
			vf.$refs.image2.setImageSize(this.props[1].size);
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

		let current = this.current;

		if (current === undefined)
			return undefined;

		if (index === 'previous')
			return current.index > 0? current.index - 1 : this.count - 1;

		return current.index + 1 < this.count? current.index + 1 : 0;
	}

	show(index, transition) {
		let vf = this.vf;

		vf.Timers.clear('image');

		index = this.getIndex(index);

		let next = this.next;
		next.index = index;
		next.setImageSrc(this.props[index].src);
		next.setImageSize(this.props[index].size);

		next.show();

		vf.$nextTick(() => {
			vf.Transitions.set(transition);
		});

		return next;
	}

}
