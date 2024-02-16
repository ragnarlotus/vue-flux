import { Size } from '../../../shared';
import Turns from '../Turns';
import SideTransformFactory from './SideTransformFactory';

describe('factory: SideTransformFactory', () => {
	const depth = 160;
	const size = new Size({
		width: 640,
		height: 360,
	});
	const viewSize = new Size();
	const sideTransformFactory = new SideTransformFactory(depth, size, viewSize);

	it('should get the proper rotate angles', () => {
		const expectations = {
			front: 'rotateX(0deg) rotateY(0deg)',
			right: 'rotateX(0deg) rotateY(90deg)',
			left: 'rotateX(0deg) rotateY(-90deg)',
			top: 'rotateX(90deg) rotateY(0deg)',
			bottom: 'rotateX(-90deg) rotateY(0deg)',
			back: 'rotateX(0deg) rotateY(180deg)',
			backl: 'rotateX(0deg) rotateY(-180deg)',
			backr: 'rotateX(0deg) rotateY(180deg)',
		};

		Object.values(Turns).forEach((turn) => {
			expect(sideTransformFactory.getRotate(turn)).toBe(expectations[turn]);
		});
	});

	it('should get proper translate coordinates', () => {
		const expectations = {
			front: 'translate3d(0%, 0%, 0px)',
			right: 'translate3d(50%, 0%, 560px)',
			left: 'translate3d(-50%, 0%, 80px)',
			top: 'translate3d(0%, -50%, 80px)',
			bottom: 'translate3d(0%, 50%, 280px)',
			back: 'translate3d(0%, 0%, 160px)',
			backl: 'translate3d(0%, 0%, 160px)',
			backr: 'translate3d(0%, 0%, 160px)',
		};

		Object.values(Turns).forEach((turn) => {
			expect(sideTransformFactory.getTranslate(turn)).toBe(
				expectations[turn]
			);
		});
	});

	it('should get each side style', () => {
		const expectations = {
			front: 'rotateX(0deg) rotateY(0deg) translate3d(0%, 0%, 0px)',
			right: 'rotateX(0deg) rotateY(90deg) translate3d(50%, 0%, 560px)',
			left: 'rotateX(0deg) rotateY(-90deg) translate3d(-50%, 0%, 80px)',
			top: 'rotateX(90deg) rotateY(0deg) translate3d(0%, -50%, 80px)',
			bottom: 'rotateX(-90deg) rotateY(0deg) translate3d(0%, 50%, 280px)',
			back: 'rotateX(0deg) rotateY(180deg) translate3d(0%, 0%, 160px)',
			backl: 'rotateX(0deg) rotateY(-180deg) translate3d(0%, 0%, 160px)',
			backr: 'rotateX(0deg) rotateY(180deg) translate3d(0%, 0%, 160px)',
		};

		Object.values(Turns).forEach((turn) => {
			expect(sideTransformFactory.getSideCss(turn)).toBe(expectations[turn]);
		});
	});
});
