import Fade from './Fade.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxImage/FluxImage.vue');

describe('transition: Fade', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Fade, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Fade, {});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			zIndex: 1,
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transition: 'opacity 1200ms ease-in',
		});

		expect(wrapper.vm.totalDuration).toBe(1200);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Fade, {
			direction: Directions.prev,
			totalDuration: 1800,
			easing: 'linear',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transition: 'opacity 1800ms linear',
		});

		expect(wrapper.vm.totalDuration).toBe(1800);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Fade, {
			direction: Directions.next,
			totalDuration: 600,
			easing: 'ease-out',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		wrapper.vm.onPlay();

		expect($from.vm.transform).toHaveBeenCalledWith({
			opacity: 0,
			transition: 'opacity 600ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(600);
	});
});
