import Size from './Size';

describe('shared: Size', () => {
	let size: Size;
	let params: object;

	it('initializes values to null without parameters', () => {
		size = new Size();

		expect(size.width.value).toBeNull();
		expect(size.height.value).toBeNull();
	});

	it('sets param values', () => {
		size = new Size({ width: 100 });
		expect(size.width.value).toBe(100);

		size = new Size({ height: 100 });
		expect(size.height.value).toBe(100);

		size = new Size({
			width: 100,
			height: 200,
		});
		expect(size.width.value).toBe(100);
		expect(size.height.value).toBe(200);
	});

	it('reset values', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		size.reset();

		expect(size.width.value).toBeNull();
		expect(size.height.value).toBeNull();
	});

	it('is invalid if width or height is null', () => {
		size = new Size({ width: 100 });
		expect(size.isValid()).toBeFalsy();

		size = new Size({ height: 100 });
		expect(size.isValid()).toBeFalsy();
	});

	it('is valid when width and height have values', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		expect(size.isValid()).toBeTruthy();
	});

	it('updates the values', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		size.update({
			width: 50,
		});

		expect(size.width.value).toBe(50);
		expect(size.height.value).toBeNull();

		size.update({
			height: 100,
		});

		expect(size.width.value).toBeNull();
		expect(size.height.value).toBe(100);

		size.update({
			width: 200,
			height: 400,
		});

		expect(size.width.value).toBe(200);
		expect(size.height.value).toBe(400);
	});

	it('throws an exception trying to calc aspect ratio when size is invalid', () => {
		size = new Size({ width: 100 });

		expect(() => size.getAspectRatio()).toThrow(
			'Could not get aspect ratio due to invalid size'
		);
	});

	it('gets the aspect ration when size is valid', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		expect(size.getAspectRatio()).toBeTypeOf('number');
	});

	it('clones the size', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size({
			width: 100,
			height: 200,
		});

		expect(size.clone().toValue()).toStrictEqual(params);
	});

	it('returns false when width does not match other size', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		expect(
			size.equals(
				new Size({
					width: 50,
					height: 200,
				})
			)
		).toBeFalsy();
	});

	it('returns false when height does not match other size', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		expect(
			size.equals(
				new Size({
					width: 100,
					height: 50,
				})
			)
		).toBeFalsy();
	});

	it('returns true when size equals another size', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size(params);

		expect(size.equals(new Size(params))).toBeTruthy();
	});

	it('returns the values as plain object', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size(params);
		expect(size.toValue()).toStrictEqual(params);

		size = new Size();
		expect(size.toValue()).toStrictEqual({});
	});

	it('throws exception when trying to get the values with px suffix', () => {
		size = new Size();
		expect(() => size.toPx()).toThrow('Invalid size in pixels');
	});

	it('returns the values with px suffix', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size(params);

		expect(size.toPx()).toStrictEqual({
			width: params['width' as keyof object] + 'px',
			height: params['height' as keyof object] + 'px',
		});
	});
});
