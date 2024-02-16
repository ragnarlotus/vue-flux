import Book from './Book.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxImage/FluxImage.vue');
vi.mock('../../components/FluxCube/FluxCube.vue');

describe('transition: Book', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Book, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Book, {});

		const size = wrapper.props('size').toValue();

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		const viewSize = $from.props('viewSize').toValue();

		expect(viewSize).toStrictEqual({
			width: Math.ceil(size.width / 2),
			height: size.height,
		});

		expect($from.props('offset').toValue()).toStrictEqual({
			top: 0,
			left: 0,
		});

		expect($from.props('css')).toStrictEqual({
			top: 0,
			left: 0,
			position: 'absolute',
		});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		const cubeOffsets = $cube.props('offsets');

		expect(cubeOffsets.front.toValue()).toStrictEqual({
			top: 0,
			left: 320,
		});

		expect(cubeOffsets.back.toValue()).toStrictEqual({
			top: 0,
			left: 0,
		});

		expect($cube.props('origin')).toBe('left center');

		expect($cube.props('css')).toStrictEqual({
			top: 0,
			left: '320px',
			position: 'absolute',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateY(-180deg)',
			transition: 'transform 1200ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(1200);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Book, {
			direction: Directions.prev,
			totalDuration: 900,
			easing: 'linear',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('offset').toValue()).toStrictEqual({
			top: 0,
			left: 320,
		});

		expect($from.props('css')).toStrictEqual({
			top: 0,
			left: '320px',
			position: 'absolute',
		});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		const cubeOffsets = $cube.props('offsets');

		expect(cubeOffsets.front.toValue()).toStrictEqual({
			top: 0,
			left: 0,
		});

		expect(cubeOffsets.back.toValue()).toStrictEqual({
			top: 0,
			left: 320,
		});

		expect($cube.props('origin')).toBe('right center');

		expect($cube.props('css')).toStrictEqual({
			top: 0,
			left: 0,
			position: 'absolute',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateY(180deg)',
			transition: 'transform 900ms linear',
		});

		expect(wrapper.vm.totalDuration).toBe(900);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Book, {
			direction: Directions.next,
			totalDuration: 1000,
			easing: 'ease-out',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('offset').toValue()).toStrictEqual({
			top: 0,
			left: 0,
		});

		expect($from.props('css')).toStrictEqual({
			top: 0,
			left: 0,
			position: 'absolute',
		});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		const cubeOffsets = $cube.props('offsets');

		expect(cubeOffsets.front.toValue()).toStrictEqual({
			top: 0,
			left: 320,
		});

		expect(cubeOffsets.back.toValue()).toStrictEqual({
			top: 0,
			left: 0,
		});

		expect($cube.props('origin')).toBe('left center');

		expect($cube.props('css')).toStrictEqual({
			top: 0,
			left: '320px',
			position: 'absolute',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateY(-180deg)',
			transition: 'transform 1000ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
