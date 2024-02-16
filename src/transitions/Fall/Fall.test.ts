import Fall from './Fall.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxImage/FluxImage.vue');

describe('transition: Fall', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Fall, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Fall, {});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		const maskStyle = wrapper.props('maskStyle');
		expect(maskStyle.overflow).toBe('visible');
		expect(maskStyle.perspective).toBeDefined();

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateX(-83.6deg)',
			transition: 'transform 1600ms ease-in',
		});

		expect(wrapper.vm.totalDuration).toBe(1600);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Fall, {
			direction: Directions.prev,
			totalDuration: 1200,
			easing: 'linear',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateX(-83.6deg)',
			transition: 'transform 1200ms linear',
		});

		expect(wrapper.vm.totalDuration).toBe(1200);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Fall, {
			direction: Directions.next,
			totalDuration: 1000,
			easing: 'ease-out',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			transform: 'rotateX(-83.6deg)',
			transition: 'transform 1000ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
