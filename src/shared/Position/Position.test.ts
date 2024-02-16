import Position from './Position';

describe('shared: Position', () => {
	let pos: Position;
	let coords: object;

	it('initializes values to null without parameters', () => {
		pos = new Position();

		expect(pos.top.value).toBeNull();
		expect(pos.left.value).toBeNull();
	});

	it('sets param values', () => {
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

	it('reset values', () => {
		pos = new Position({
			top: 100,
			left: 200,
		});

		pos.reset();

		expect(pos.top.value).toBeNull();
		expect(pos.left.value).toBeNull();
	});

	it('is invalid if top or left is null', () => {
		pos = new Position({ top: 100 });
		expect(pos.isValid()).toBeFalsy();

		pos = new Position({ left: 100 });
		expect(pos.isValid()).toBeFalsy();
	});

	it('is valid when top and left have values', () => {
		pos = new Position({
			top: 100,
			left: 200,
		});

		expect(pos.isValid()).toBeTruthy();
	});

	it('updates the values', () => {
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

	it('returns the values as plain object', () => {
		coords = {
			top: 100,
			left: 200,
		};

		pos = new Position(coords);
		expect(pos.toValue()).toStrictEqual(coords);

		pos = new Position();
		expect(pos.toValue()).toStrictEqual({
			top: undefined,
			left: undefined,
		});
	});

	it('throws exception when trying to get the values with px suffix', () => {
		pos = new Position();
		expect(() => pos.toPx()).toThrow('Invalid position in pixels');
	});

	it('returns the values with px suffix', () => {
		coords = {
			top: 100,
			left: 200,
		};

		pos = new Position(coords);

		expect(pos.toPx()).toStrictEqual({
			top: coords['top' as keyof object] + 'px',
			left: coords['left' as keyof object] + 'px',
		});
	});
});
