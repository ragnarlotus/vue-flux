import Size from './Size';

describe('Shared: Size', () => {
	let size: Size;
	let params: object;

	test('initializes values to null without parameters', () => {
		size = new Size();

		expect(size.width.value).toBeNull();
		expect(size.height.value).toBeNull();
	});

	test('sets param values', () => {
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

	test('reset values', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		size.reset();

		expect(size.width.value).toBeNull();
		expect(size.height.value).toBeNull();
	});

	test('is invalid if width or height is null', () => {
		size = new Size({ width: 100 });
		expect(size.isValid()).toBe(false);

		size = new Size({ height: 100 });
		expect(size.isValid()).toBe(false);
	});

	test('is valid when width and height have values', () => {
		size = new Size({
			width: 100,
			height: 200,
		});

		expect(size.isValid()).toBe(true);
	});

	test('updates the values', () => {
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

	test('returns the values as plain object', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size(params);
		expect(size.toValue()).toEqual(params);

		size = new Size();
		expect(size.toValue()).toEqual({
			width: undefined,
			height: undefined,
		});
	});

	test('throws exception when trying to get the values with px suffix', () => {
		size = new Size();
		expect(() => size.toPx()).toThrowError();
	});

	test('returns the values with px suffix', () => {
		params = {
			width: 100,
			height: 200,
		};

		size = new Size(params);

		expect(size.toPx()).toEqual({
			width: params['width' as keyof object] + 'px',
			height: params['height' as keyof object] + 'px',
		});
	});
});
