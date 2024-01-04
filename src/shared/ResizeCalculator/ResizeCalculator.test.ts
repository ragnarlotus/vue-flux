import { Size } from '../';
import { ResizeTypes } from '../../resources';
import ResizeCalculator, { Orientations } from './ResizeCalculator';

describe('shared: ResizeCalculator', () => {
	let calc: ResizeCalculator;
	let realSize: Size;
	let newSize: Size;

	beforeEach(() => {
		realSize = new Size();
		newSize = new Size();
	});

	it('if the size is invalid throws error', () => {
		vi.spyOn(realSize, 'isValid').mockImplementation(() => false);

		expect(() => {
			calc = new ResizeCalculator(realSize);
		}).toThrow('Invalid real size');

		expect(realSize.isValid).toHaveBeenCalledWith();
	});

	it('if the size is valid when creating the calculator', () => {
		vi.spyOn(realSize, 'isValid').mockImplementation(() => true);

		expect(() => {
			calc = new ResizeCalculator(realSize);
		}).not.toThrow();

		expect(realSize.isValid).toHaveBeenCalledWith();
	});

	it('detects the orientation', () => {
		realSize.update({
			width: 640,
			height: 360,
		});

		calc = new ResizeCalculator(realSize);

		expect(calc.realOrientation).toBe(Orientations.landscape);

		realSize.update({
			width: 360,
			height: 640,
		});

		calc = new ResizeCalculator(realSize);

		expect(calc.realOrientation).toBe(Orientations.portrait);
	});

	it('if the new size is valid', () => {
		vi.spyOn(newSize, 'isValid').mockImplementation(() => false);

		realSize.update({
			width: 640,
			height: 360,
		});

		calc = new ResizeCalculator(realSize);

		expect(() => {
			calc.resizeTo(newSize, ResizeTypes.fill);
		}).toThrow('Invalid size to resize');

		expect(newSize.isValid).toHaveBeenCalledWith();
	});

	it('real size L new size L and type fill', () => {
		realSize.update({
			width: 640,
			height: 360,
		});

		newSize.update({
			width: 280,
			height: 140,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 280,
			height: 157.5,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: -8.75, left: 0 });
	});

	it('real size L new size L and type fit', () => {
		realSize.update({
			width: 640,
			height: 360,
		});

		newSize.update({
			width: 320,
			height: 180,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 320, height: 180 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: 0 });
	});

	it('real size L new size P and type fill', () => {
		realSize.update({
			width: 640,
			height: 360,
		});

		newSize.update({
			width: 300,
			height: 720,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 1280, height: 720 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: -490 });
	});

	it('real size L new size P and type fit', () => {
		realSize.update({
			width: 640,
			height: 360,
		});

		newSize.update({
			width: 300,
			height: 720,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 300,
			height: 168.75,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({
			top: 275.625,
			left: 0,
		});
	});

	it('real size P new size L and type fill', () => {
		realSize.update({
			width: 360,
			height: 640,
		});

		newSize.update({
			width: 720,
			height: 360,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 720, height: 1280 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: -460, left: 0 });
	});

	it('real size P new size L and type fit', () => {
		realSize.update({
			width: 360,
			height: 640,
		});

		newSize.update({
			width: 720,
			height: 360,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 202.5,
			height: 360,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: 258.75 });
	});

	it('real size P new size P and type fill', () => {
		realSize.update({
			width: 360,
			height: 640,
		});

		newSize.update({
			width: 180,
			height: 520,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 292.5,
			height: 520,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: -56.25 });
	});

	it('real size P new size P and type fit', () => {
		realSize.update({
			width: 360,
			height: 640,
		});

		newSize.update({
			width: 180,
			height: 520,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 180, height: 320 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 100, left: 0 });
	});
});
