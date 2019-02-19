export default class ImagesController {

	constructor(vm) {
		this.vm = vm;

		this.count = 0;
		this.loading = [];
		this.loaded = 0;
		this.props = [];
	}

	get current() {
		let refs = this.vm.$refs;

		if (refs.image1 === undefined)
			return undefined;

		return refs.image2.style.zIndex === 11? refs.image2 : refs.image1;
	}

	get next() {
		let refs = this.vm.$refs;

		return refs.image1.style.zIndex === 10? refs.image1 : refs.image2;
	}

	preload() {
		let vm = this.vm;

		this.loading = vm.images.slice(0);
		this.count = this.loading.length || 0;
		this.loaded = 0;
		this.props = [];

		if (this.count < 2 || vm.Transitions.count === 0)
			return;

		vm.loaded = false;
	}

	add(index) {
		this.loaded++;

		let vm = this.vm;
		let img = vm.$refs.loading[index];

		if (img.naturalWidth || img.width) {
			this.props[index] = {
				src: img.src,
				size: {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height
				}
			};

		} else {
			console.warn('Image '+ vm.images[index] +' could not be loaded');
		}

		if (index === 0) {
			vm.$refs.image1.setSrc(this.props[0].src);
			vm.$refs.image1.setSize(this.props[0].size);
			vm.$refs.image1.index = 0;
			vm.$refs.image1.init();
		}

		if (index === 1) {
			vm.$refs.image2.setSrc(this.props[1].src);
			vm.$refs.image2.setSize(this.props[1].size);
			vm.$refs.image2.index = 1;
			vm.$refs.image2.init();
		}

		if (this.loaded === this.loading.length) {
			this.loading = [];

			if (vm.loaded !== true)
				vm.init();
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
		let vm = this.vm;

		vm.Timers.clear('image');

		index = this.getIndex(index);

		let next = this.next;
		next.setSrc(this.props[index].src);
		next.setSize(this.props[index].size);
		next.index = index;

		next.show();

		vm.$nextTick(() => {
			vm.Transitions.set(transition);
		});

		return next;
	}

}
