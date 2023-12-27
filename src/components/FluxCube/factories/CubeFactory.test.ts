import { Size } from '../../../shared';
import CubeFactory from './CubeFactory';
import SideTransformFactory from './SideTransformFactory';

describe('Factory: CubeFactory', () => {
	let sideTransformFactory;

	const depth = 160;
	const size = new Size({
		width: 640,
		height: 360,
	});
	const viewSize = new Size();

	beforeEach(() => {
		sideTransformFactory = new SideTransformFactory(depth, size, viewSize);
	});

	test('');
});
