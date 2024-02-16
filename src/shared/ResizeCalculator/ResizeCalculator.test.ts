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

	it('new size L real size L and newAspectRatio >= realAspectRatio and type fill', () => {
		newSize.update({
			width: 280,
			height: 140,
		});

		realSize.update({
			width: 640,
			height: 360,
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

	it('new size L real size L and newAspectRatio < realAspectRatio and type fill', () => {
		newSize.update({
			width: 280,
			height: 180,
		});

		realSize.update({
			width: 280,
			height: 140,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 280,
			height: 140,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 20, left: 0 });
	});

	it('new size L real size L and newAspectRatio >= realAspectRatio and type fit', () => {
		newSize.update({
			width: 280,
			height: 140,
		});

		realSize.update({
			width: 280,
			height: 200,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 196, height: 140 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: 42 });
	});

	it('new size L real size L and newAspectRatio < realAspectRatio and type fit', () => {
		newSize.update({
			width: 280,
			height: 180,
		});

		realSize.update({
			width: 280,
			height: 140,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 280,
			height: 140,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 20, left: 0 });
	});

	it('new size L real size P and type fill', () => {
		newSize.update({
			width: 280,
			height: 140,
		});

		realSize.update({
			width: 140,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 280, height: 560 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: -210, left: 0 });
	});

	it('new size L real size P and type fit', () => {
		newSize.update({
			width: 280,
			height: 140,
		});

		realSize.update({
			width: 140,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 70,
			height: 140,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: 105 });
	});

	it('new size P real size L and type fill', () => {
		newSize.update({
			width: 140,
			height: 280,
		});

		realSize.update({
			width: 280,
			height: 140,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 560, height: 280 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: -210 });
	});

	it('new size P real size L and type fit', () => {
		newSize.update({
			width: 140,
			height: 280,
		});

		realSize.update({
			width: 280,
			height: 140,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 140,
			height: 70,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({
			top: 105,
			left: 0,
		});
	});

	it('new size P real size P and newAspectRatio >= realAspectRatio and type fill', () => {
		newSize.update({
			width: 140,
			height: 280,
		});

		realSize.update({
			width: 180,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 180,
			height: 280,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: -20 });
	});

	it('new size P real size P and newAspectRatio < realAspectRatio and type fill', () => {
		newSize.update({
			width: 180,
			height: 280,
		});

		realSize.update({
			width: 140,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fill
		);

		expect(adaptedSize.toValue()).toStrictEqual({
			width: 180,
			height: 360,
		});
		expect(adaptedPosition.toValue()).toStrictEqual({ top: -40, left: 0 });
	});

	it('new size P real size P and newAspectRatio >= realAspectRatio and type fit', () => {
		newSize.update({
			width: 140,
			height: 280,
		});

		realSize.update({
			width: 200,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 140, height: 196 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 42, left: 0 });
	});

	it('new size P real size P and newAspectRatio < realAspectRatio and type fit', () => {
		newSize.update({
			width: 180,
			height: 280,
		});

		realSize.update({
			width: 140,
			height: 280,
		});

		calc = new ResizeCalculator(realSize);

		const { size: adaptedSize, position: adaptedPosition } = calc.resizeTo(
			newSize,
			ResizeTypes.fit
		);

		expect(adaptedSize.toValue()).toStrictEqual({ width: 140, height: 280 });
		expect(adaptedPosition.toValue()).toStrictEqual({ top: 0, left: 20 });
	});
});
