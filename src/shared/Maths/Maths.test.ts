import * as Maths from './Maths';

describe('Shared: Maths', () => {
	test('calculates the diagonal', () => {
		const size = {
			width: 640,
			height: 360,
		};

		expect(Maths.diag(size)).toBe(735);
	});

	test('calculates the aspect ratio', () => {
		const size = {
			width: 640,
			height: 320,
		};

		expect(Maths.aspectRatio(size)).toBe(2);
	});
});
