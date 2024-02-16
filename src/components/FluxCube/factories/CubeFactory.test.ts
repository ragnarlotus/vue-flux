import { Img } from '../../../resources';
import { Position, Size } from '../../../shared';
import { SideProps } from '../types';
import CubeFactory from './CubeFactory';
import CubeSideFactory from './CubeSideFactory';
import SideTransformFactory from './SideTransformFactory';

describe('factory: CubeFactory', () => {
	let rsc, rscs, color, colors, offset, offsets;

	const depth = 160;
	const size = new Size({
		width: 640,
		height: 360,
	});
	const viewSize = new Size();

	const sideTransformFactory = new SideTransformFactory(depth, size, viewSize);

	vi.spyOn(CubeSideFactory, 'getProps').mockImplementation(
		() => ({}) as SideProps
	);

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('generates a cube using a color', () => {
		color = '#ccc';

		const cubeProps = CubeFactory.getSidesProps(sideTransformFactory, color);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(6);
		expect(Object.keys(cubeProps)).toHaveLength(6);
	});

	it('generates a cube using a colors', () => {
		colors = {
			top: '#ccc',
			left: '#ccc',
			back: '#ccc',
		};

		const cubeProps = CubeFactory.getSidesProps(
			sideTransformFactory,
			undefined,
			colors
		);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(3);
		expect(Object.keys(cubeProps)).toHaveLength(3);
	});

	it('generates a cube using a rsc', () => {
		rsc = new Img('url', 'caption');

		const cubeProps = CubeFactory.getSidesProps(
			sideTransformFactory,
			undefined,
			undefined,
			rsc
		);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(6);
		expect(Object.keys(cubeProps)).toHaveLength(6);
	});

	it('generates a cube using a rscs', () => {
		rscs = {
			bottom: new Img('url', 'caption'),
			right: new Img('url', 'caption'),
			front: new Img('url', 'caption'),
		};

		const cubeProps = CubeFactory.getSidesProps(
			sideTransformFactory,
			undefined,
			undefined,
			undefined,
			rscs
		);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(3);
		expect(Object.keys(cubeProps)).toHaveLength(3);
	});

	it('generates a cube using a color with offset', () => {
		color = '#ccc';
		offset = new Position({ top: 160, left: 80 });

		const cubeProps = CubeFactory.getSidesProps(
			sideTransformFactory,
			color,
			undefined,
			undefined,
			undefined,
			offset
		);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(6);
		expect(Object.keys(cubeProps)).toHaveLength(6);
	});

	it('generates a cube using a colors with offsets', () => {
		colors = {
			top: '#ccc',
			left: '#ccc',
			back: '#ccc',
		};

		offsets = {
			top: new Position({ top: 160, left: 80 }),
			left: new Position({ top: 160, left: 80 }),
			back: new Position({ top: 160, left: 80 }),
		};

		const cubeProps = CubeFactory.getSidesProps(
			sideTransformFactory,
			undefined,
			colors,
			undefined,
			undefined,
			undefined,
			offsets
		);

		expect(CubeSideFactory.getProps).toHaveBeenCalledTimes(3);
		expect(Object.keys(cubeProps)).toHaveLength(3);
	});
});
