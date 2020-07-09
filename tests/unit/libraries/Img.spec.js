import Img from '@/libraries/Img';

describe('Img', () => {
	const LOAD_SRC_SUCCESS = 'logo.jpg';
	let img, view, coverSize, coverPosition, loadError, coverProps;

	beforeEach(() => {
		Object.defineProperty(global.Image.prototype, 'src', {
			set(src) {
				if (src === LOAD_SRC_SUCCESS)
					setTimeout(() => this.onload());

				else
					setTimeout(() => this.onerror(new Error('image load error')));
			},
		});
	});

	test('instances properly', () => {
		img = new Img('logo.jpg', 3);

		expect(img.src).toBe('logo.jpg');
		expect(img.initIndex).toBe(3);
	});

	test('loads properly', async () => {
		img = new Img('logo.jpg', 3);

		await img.load();

		expect(img.status).toBe('loaded');
	});

	test('cant load', async () => {
		img = new Img('logo.jpe', 3);

		try {
			await img.load();
		} catch (e) {
			loadError = e;
		}

		expect(img.status).toBe('error');
	});

	test('does not load again if already loaded', async () => {
		const size = {
			width: 1,
			height: 1,
		};

		img = new Img('logo.jpg', 3);
		img.status = 'loaded';
		img.size = size;

		await img.load();

		expect(img.size).toBe(size);
	});

	test('does not load again if couldnt be loaded', async () => {
		img = new Img('logo.jpg', 3);
		img.status = 'error';

		try {
			await img.load();
		} catch (e) {
			loadError = e;
		}

		expect(loadError).toBe(`Image logo.jpg could not be loaded`);
	});

	test('get no cover props if no view size', () => {
		img = new Img('logo.jpg', 3);
		img.status = 'loaded';

		coverProps = img.getCoverProps();

		expect(coverProps).toEqual(undefined);
	});

	test('get no cover props if image not loaded', () => {
		img = new Img('logo.jpg', 3);
		img.status = undefined;

		coverProps = img.getCoverProps({});

		expect(coverProps).toEqual(undefined);
	});

	test('get cover props', () => {
		img = new Img('logo.jpg', 3);
		img.status = 'loaded';
		img.aspectRatio = 1.4;

		coverProps = img.getCoverProps({
			width: 280,
			height: 140,
		});

		expect(coverProps).toEqual({
			position: {
				top: -30,
				left: 0
			},
			size: {
				width: 280,
				height: 200,
			},
		});
	});

	test('get cover size for widther view', () => {
		view = {
			aspectRatio: 1.3,
			size: {
				width: 640,
				height: 480,
			},
		};

		img = new Img('logo.jpg', 3);
		img.aspectRatio = 0.8;

		coverSize = img.getCoverSize(view);

		expect(coverSize).toEqual({
			width: 640,
			height: 800,
		});
	});

	test('get cover size for heighter view', () => {
		view = {
			aspectRatio: 1.3,
			size: {
				width: 640,
				height: 480,
			},
		};

		img = new Img('logo.jpg', 3);
		img.aspectRatio = 1.9;

		coverSize = img.getCoverSize(view);

		expect(coverSize).toEqual({
			width: 912,
			height: 480,
		});
	});

	test('get cover position for widther view', async () => {
		view = {
			aspectRatio: 1.3,
			size: {
				width: 640,
				height: 480,
			},
		};

		coverSize = {
			width: 320,
			height: 200,
		};

		img = new Img('logo.jpg', 3);
		img.aspectRatio = 0.8;

		coverPosition = img.getCoverPosition(view, coverSize);

		expect(coverPosition).toEqual({
			top: 140,
			left: 0,
		});
	});

	test('get cover position for heighter view', () => {
		view = {
			aspectRatio: 1.3,
			size: {
				width: 640,
				height: 480,
			},
		};

		coverSize = {
			width: 100,
			height: 320,
		};

		img = new Img('logo.jpg', 3);
		img.aspectRatio = 1.9;

		coverPosition = img.getCoverPosition(view, coverSize);

		expect(coverPosition).toEqual({
			top: 0,
			left: 270,
		});
	});

});
