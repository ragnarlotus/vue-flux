import Cube from './Cube.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers';
import { Turns } from '../../components/FluxCube';

vi.mock('../../components/FluxCube/FluxCube.vue');

describe('transition: Cube', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Cube, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('expects to set proper CSS styles before animation', () => {
		const wrapper = AnimationWrapper(Cube, {});

		const maskStyle = wrapper.props('maskStyle');
		expect(maskStyle.overflow).toBe('visible');
		expect(maskStyle.perspective).toBeDefined();
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Cube, {});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.turn).toHaveBeenCalledWith(Turns.left);

		expect(wrapper.vm.totalDuration).toBe(1400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Cube, {
			direction: Directions.prev,
			totalDuration: 900,
			easing: 'ease-in',
		});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.turn).toHaveBeenCalledWith(Turns.right);

		expect(wrapper.vm.totalDuration).toBe(900);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Cube, {
			direction: Directions.next,
			totalDuration: 300,
			easing: 'ease-in-out',
		});

		const $cube = wrapper.getComponent({
			ref: '$cube',
		});

		wrapper.vm.onPlay();

		expect($cube.vm.turn).toHaveBeenCalledWith(Turns.left);

		expect(wrapper.vm.totalDuration).toBe(300);
	});
});
