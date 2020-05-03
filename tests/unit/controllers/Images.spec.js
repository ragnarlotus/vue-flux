import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import ImagesController from '@/controllers/Images';
import Img from '@/libraries/Img';

describe('ImagesController', () => {
	let ctrl, vf;

	const initWithImgs = numImages => {
		ctrl.imgs = [];

		for (let i = 0; i < numImages; i++) {
			ctrl.imgs.push({
				index: i,
			});
		}
	}

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions: [
					'fade',
				],
			}
		}).vm;

		ctrl = new ImagesController(vf);
	});

	test('get previous image when current image is last', () => {
		initWithImgs(3);

		ctrl.current = ctrl.imgs[2];

		expect(ctrl.prev).toBe(ctrl.imgs[1]);
	});

	test('get previous image when current image is first', () => {
		initWithImgs(3);

		ctrl.current = ctrl.imgs[0];

		expect(ctrl.prev).toBe(ctrl.imgs[2]);
	});

	test('updates last when current updated', () => {
		initWithImgs(3);

		ctrl.current = ctrl.imgs[0];
		ctrl.current = ctrl.imgs[1];

		expect(ctrl.last).toBe(ctrl.imgs[0]);
	});

	test('get next image when current image is first', () => {
		initWithImgs(3);

		ctrl.current = ctrl.imgs[0];

		expect(ctrl.next).toBe(ctrl.imgs[1]);
	});

	test('get next image when current image is last', () => {
		initWithImgs(3);

		ctrl.current = ctrl.imgs[2];

		expect(ctrl.next).toBe(ctrl.imgs[0]);
	});

	test('reset initializes all data', () => {
		ctrl.srcs = ['src1', 'src2'];
		ctrl.imgs = ['img1', 'img2'];
		ctrl.loading = ['src1', 'src2'];
		ctrl.loaded.current = 2;
		ctrl.loaded.success = 2;
		ctrl.loaded.error = 2;
		ctrl.loaded.total = 2;
		ctrl.progress = 2;
		ctrl.toPreload = 2;
		ctrl.toLazyload = 2;
		ctrl.preloading = true;
		ctrl.lazyloading = true;
		ctrl.current = 'src1';

		ctrl.reset();

		expect(ctrl.srcs.length).toBe(0);
		expect(ctrl.imgs.length).toBe(0);
		expect(ctrl.loading.length).toBe(0);
		expect(ctrl.loaded.current).toBe(0);
		expect(ctrl.loaded.success).toBe(0);
		expect(ctrl.loaded.error).toBe(0);
		expect(ctrl.loaded.total).toBe(0);
		expect(ctrl.progress).toBe(0);
		expect(ctrl.toPreload).toBe(0);
		expect(ctrl.toLazyload).toBe(0);
		expect(ctrl.preloading).toBe(false);
		expect(ctrl.lazyloading).toBe(false);
		expect(ctrl.current).toBe(undefined);
	});

	test('hard reset also initializes last image', () => {
		ctrl.last = 'src1';

		ctrl.reset(true);

		expect(ctrl.last).toBe(undefined);
	});

	test('update images resets controller data', () => {
		ctrl.reset = jest.fn()

		ctrl.update([]);

		expect(ctrl.reset).toHaveBeenCalled();
	});

	test('set as preloading', () => {
		ctrl.preloadStart();

		expect(ctrl.preloading).toBe(true);
	});

	test('preloads all images when lazy load disabled', () => {
		vf.config.lazyLoadAfter = 1;
		vf.config.lazyLoad = false;

		ctrl.update([
			'src1',
			'src2',
			'src3',
		]);

		expect(ctrl.toPreload).toBe(3);
	});

	test('preloads images not lazy loaded', () => {
		vf.config.lazyLoadAfter = 2;
		vf.config.lazyLoad = true;

		ctrl.update([
			'src1',
			'src2',
			'src3',
		]);

		expect(ctrl.toPreload).toBe(2);
	});

	test('preloads all images if num images less than defined for lazy load', () => {
		vf.config.lazyLoadAfter = 6;
		vf.config.lazyLoad = true;

		ctrl.update([
			'src1',
			'src2',
			'src3',
			'src4',
		]);

		expect(ctrl.toPreload).toBe(4);
	});

	test('preaload starts again if prelodaded images less than defined and more images to load' , () => {
		jest.spyOn(ctrl, 'preloadStart');

		vf.config.lazyLoadAfter = 6;
		vf.config.lazyLoad = true;
		ctrl.toPreload = 10;
		ctrl.loaded.success = 2;
		ctrl.loaded.error = 4;

		ctrl.preloadEnd();

		expect(ctrl.preloadStart).toHaveBeenCalled();
	});

	test('does not preaload starts again if prelodaded images less than defined but no more images to load' , () => {
		jest.spyOn(ctrl, 'preloadStart');

		vf.config.lazyLoadAfter = 6;
		vf.config.lazyLoad = true;
		ctrl.toPreload = 10;
		ctrl.loaded.success = 2;
		ctrl.loaded.error = 8;
		ctrl.loaded.total = 10;

		ctrl.preloadEnd();

		expect(ctrl.preloadStart).not.toHaveBeenCalled();
	});

	test('vue flux initialized if no images to lazy load' , () => {
		jest.spyOn(vf, 'init');
		jest.spyOn(ctrl, 'lazyLoadStart');

		vf.config.lazyLoadAfter = 4;
		vf.config.lazyLoad = true;
		ctrl.toPreload = 4;
		ctrl.loaded.success = 4;
		ctrl.loaded.total = 4;

		ctrl.preloadEnd();

		expect(ctrl.lazyLoadStart).not.toHaveBeenCalled();
		expect(vf.init).toHaveBeenCalled();
	});

	test('start lazy loading images if preload completed' , () => {
		jest.spyOn(ctrl, 'lazyLoadStart');

		vf.config.lazyLoadAfter = 2;
		vf.config.lazyLoad = true;
		ctrl.srcs = ['a', 'b', 'c', 'd'];
		ctrl.toPreload = 2;
		ctrl.loaded.success = 2;
		ctrl.loaded.total = 2;

		ctrl.preloadEnd();

		expect(ctrl.lazyLoadStart).toHaveBeenCalled();
	});

	test('ends lazy loading', () => {
		ctrl.lazyLoadEnd();

		expect(ctrl.lazyloading).toBe(false);
	});

	test('add image if image loaded successfully', async () => {
		jest.spyOn(ctrl, 'loadSuccess');
		jest.spyOn(ctrl, 'loadError');

		Img.prototype.load = () => Promise.resolve();

		await ctrl.addImg('src', 1, 2);

		expect(ctrl.loadSuccess).toHaveBeenCalled();
		expect(ctrl.loadError).not.toHaveBeenCalled();
	});

	test('does not add image if image load error', async () => {
		jest.spyOn(ctrl, 'loadSuccess');
		jest.spyOn(ctrl, 'loadError');

		Img.prototype.load = () => Promise.reject('image load error');

		await ctrl.addImg('error-src', 3, 4);

		expect(ctrl.loadSuccess).not.toHaveBeenCalled();
		expect(ctrl.loadError).toHaveBeenCalled();
	});

	test('set current image if first valid image' , () => {
		ctrl.preloading = true;
		const front = {
			status: 'loaded',
		};

		ctrl.loading = [{
			status: 'error',
		}, {
			status: 'error',
		}, front, {
			status: undefined,
		}, {
			status: 'error',
		}];

		ctrl.loadSuccess();

		expect(ctrl.current).toBe(front);
	});

	test('dont set current image if not first loaded', () => {
		ctrl.preloading = true;

		ctrl.loading = [{
			status: 'error',
		}, {
			status: undefined,
		}, {
			status: 'error',
		}, {
			status: 'loaded',
		}, {
			status: 'error',
		}];

		ctrl.loadSuccess();

		expect(ctrl.current).toBe(undefined);
	});

	test('do not update progress after loading an image if not preloading', async () => {
		jest.spyOn(ctrl, 'updateProgress');

		ctrl.preloading = false;

		Img.prototype.load = () => Promise.resolve();

		await ctrl.addImg('src', 0, 0);

		expect(ctrl.updateProgress).not.toHaveBeenCalled();
	});

	test('update progress after loading an image if preloading', async () => {
		jest.spyOn(ctrl, 'updateProgress');

		ctrl.preloading = true;

		Img.prototype.load = () => Promise.resolve();

		await ctrl.addImg('src', 0, 0);

		expect(ctrl.updateProgress).toHaveBeenCalled();
	});

	test('progress 0 if unknown error' , () => {
		ctrl.toPreload = 10;
		ctrl.loaded.success = 0;

		ctrl.updateProgress();
		expect(ctrl.progress).toBe(0);
	});

	test('update image load progress' , () => {
		ctrl.toPreload = 10;
		ctrl.loaded.success = 5;

		ctrl.updateProgress();
		expect(ctrl.progress).toBe(50);
	});

	test('end preload if last image', async () => {
		jest.spyOn(ctrl, 'preloadEnd');

		ctrl.preloading = true;
		ctrl.loading = ['src'];

		Img.prototype.load = () => Promise.resolve();

		await ctrl.addImg('src', 0, 0);

		expect(ctrl.preloadEnd).toHaveBeenCalled();
	});

	test('end lazyload if last image', async () => {
		jest.spyOn(ctrl, 'lazyLoadEnd');

		ctrl.preloading = false;
		ctrl.loading = ['src'];

		Img.prototype.load = () => Promise.resolve();

		await ctrl.addImg('src', 0, 0);

		expect(ctrl.lazyLoadEnd).toHaveBeenCalled();
	});

	test('update loaded images indexes' , () => {
		ctrl.loading = [{
			status: 'loaded',
		}, {
			status: 'error',
		}, {
			status: 'loaded',
		}];

		ctrl.addLoadedSuccessfully();

		expect(ctrl.imgs.length).toBe(2);
	});

	test('update image indexes', () => {
		ctrl.imgs = [{
			index: 2,
		}, {
			index: 5,
		}, {
			index: 1,
		}];

		ctrl.updateIndexes();

		expect(ctrl.imgs).toEqual([{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}]);
	});

	test('gets resource by index number', () => {
		ctrl.imgs = [{}, {}, {}];

		expect(ctrl.getByIndex(1)).toBe(ctrl.imgs[1]);
	});

	test('get next index when current is last' , () => {
		initWithImgs(3);
		ctrl.current = ctrl.imgs[2];

		expect(ctrl.getByIndex('next')).toBe(ctrl.imgs[0]);
	});

	test('get prev index when current is first' , () => {
		initWithImgs(3);
		ctrl.current = ctrl.imgs[0];

		expect(ctrl.getByIndex('prev')).toBe(ctrl.imgs[2]);
	});

	test('throws errors when image index error' , () => {
		initWithImgs(3);

		expect(() => {
			ctrl.getByIndex('z');
		}).toThrow();
	});

});
