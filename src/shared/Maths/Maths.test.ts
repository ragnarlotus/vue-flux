import * as Maths from './Maths';

describe('shared: Maths', () => {
	it('calculates the diagonal', () => {
		const size = {
			width: 640,
			height: 360,
		};

		expect(Maths.diag(size)).toBe(735);
	});

	it('calculates the aspect ratio', () => {
		const size = {
			width: 640,
			height: 320,
		};

		expect(Maths.aspectRatio(size)).toBe(2);
	});
});
