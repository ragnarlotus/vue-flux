export default class ImagesManager {

	constructor(vm) {
		this.vm = vm;

		this.count = 0;
		this.loading = [];
		this.loaded = 0;
		this.props = [];
	}

	preload() {
		let vm = this.vm;

		this.loading = vm.images.slice(0);
		this.count = this.loading.length || 0;
		this.loaded = 0;
		this.props = [];

		if (this.count < 2 || vm.traman.count === 0)
			return;

		vm.loaded = false;
		vm.image1Index = 0;
		vm.image2Index = 1;

		vm.$nextTick(() => {
			vm.$refs.image1.setCss({ zIndex: 11 });
			vm.$refs.image2.setCss({ zIndex: 10 });
		});
	}

	add(i) {
		this.loaded++;

		let vm = this.vm;
		let img = vm.$refs.images[i];

		if (img.naturalWidth || img.width) {
			this.props[i] = {
				src: img.src,
				width: img.naturalWidth || img.width,
				height: img.naturalHeight || img.height
			};

		} else {
			console.warn('Image '+ vm.images[i] +' could not be loaded');
		}

		if (i === 0)
			vm.$refs.image1.init();

		if (this.loaded === this.count)
			vm.init();
	}

	current() {
		let refs = this.vm.$refs;

		if (refs.image1 === undefined)
			return undefined;

		return refs.image2.style.zIndex === 11? refs.image2 : refs.image1;
	}

	next() {
		let refs = this.vm.$refs;

		return refs.image1.style.zIndex === 10? refs.image1 : refs.image2;
	}

	getIndex(index) {
		if (typeof index === 'number')
			return index;

		let current = this.current();

		if (current === undefined)
			return undefined;

		if (index === 'previous')
			return current.index > 0? current.index - 1 : this.count - 1;

		return current.index + 1 < this.count? current.index + 1 : 0;
	}

	show(index, transition) {
		let vm = this.vm;

		vm.timman.clear('image');

		let next = this.next();

		vm[next.reference] = this.getIndex(index);
		next.show();

		vm.$nextTick(() => {
			vm.traman.set(transition);
		});

		return next;
	}

}
