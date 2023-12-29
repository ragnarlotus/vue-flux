import Position from './Position';

describe('Shared: Position', () => {
	let pos: Position;
	let coords: object;

	test('initializes values to null without parameters', () => {
		pos = new Position();

		expect(pos.top.value).toBeNull();
		expect(pos.left.value).toBeNull();
	});

	test('sets param values', () => {
		pos = new Position({ top: 100 });
		expect(pos.top.value).toBe(100);

		pos = new Position({ left: 100 });
		expect(pos.left.value).toBe(100);

		pos = new Position({
			top: 100,
			left: 200,
		});
		expect(pos.top.value).toBe(100);
		expect(pos.left.value).toBe(200);
	});

	test('reset values', () => {
		pos = new Position({
			top: 100,
			left: 200,
		});

		pos.reset();

		expect(pos.top.value).toBeNull();
		expect(pos.left.value).toBeNull();
	});

	test('is invalid if top or left is null', () => {
		pos = new Position({ top: 100 });
		expect(pos.isValid()).toBe(false);

		pos = new Position({ left: 100 });
		expect(pos.isValid()).toBe(false);
	});

	test('is valid when top and left have values', () => {
		pos = new Position({
			top: 100,
			left: 200,
		});

		expect(pos.isValid()).toBe(true);
	});

	test('updates the values', () => {
		pos = new Position({
			top: 100,
			left: 200,
		});

		pos.update({
			top: 50,
		});

		expect(pos.top.value).toBe(50);
		expect(pos.left.value).toBeNull();

		pos.update({
			left: 100,
		});

		expect(pos.top.value).toBeNull();
		expect(pos.left.value).toBe(100);

		pos.update({
			top: 200,
			left: 400,
		});

		expect(pos.top.value).toBe(200);
		expect(pos.left.value).toBe(400);
	});

	test('returns the values as plain object', () => {
		coords = {
			top: 100,
			left: 200,
		};

		pos = new Position(coords);
		expect(pos.toValue()).toEqual(coords);

		pos = new Position();
		expect(pos.toValue()).toEqual({
			top: undefined,
			left: undefined,
		});
	});

	test('throws exception when trying to get the values with px suffix', () => {
		pos = new Position();
		expect(() => pos.toPx()).toThrowError();
	});

	test('returns the values with px suffix', () => {
		coords = {
			top: 100,
			left: 200,
		};

		pos = new Position(coords);

		expect(pos.toPx()).toEqual({
			top: coords['top' as keyof object] + 'px',
			left: coords['left' as keyof object] + 'px',
		});
	});
});
