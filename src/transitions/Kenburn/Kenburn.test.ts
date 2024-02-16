import Kenburn from './Kenburn.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxImage/FluxImage.vue');

describe('transition: Kenburn', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Kenburn, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Kenburn, {});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transform: expect.any(String),
			transition: 'all 1500ms linear',
		});

		expect(wrapper.vm.totalDuration).toBe(1500);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Kenburn, {
			direction: Directions.prev,
			totalDuration: 800,
			easing: 'ease-in',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transform: expect.any(String),
			transition: 'all 800ms ease-in',
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Kenburn, {
			direction: Directions.next,
			totalDuration: 800,
			easing: 'ease-in',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transform: expect.any(String),
			transition: 'all 800ms ease-in',
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});
});
