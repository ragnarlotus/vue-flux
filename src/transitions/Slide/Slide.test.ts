import Slide from './Slide.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';
import { Size } from '../../shared';

vi.mock('../../components/FluxWrapper/FluxWrapper.vue');

describe('transition: Slide', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Slide, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Slide, {});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: 1280, height: 360 })
		);
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
		});

		const $left = wrapper.getComponent({
			ref: '$left',
		});

		expect($left.props('size')).toStrictEqual(wrapper.props('size'));

		const $right = wrapper.getComponent({
			ref: '$right',
		});

		expect($right.props('size')).toStrictEqual(wrapper.props('size'));

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transform: 'translateX(-50%)',
			transition: 'transform 1400ms ease-in-out',
		});

		expect(wrapper.vm.totalDuration).toBe(1400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Slide, {
			direction: Directions.prev,
			totalDuration: 800,
			easing: 'ease-out',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: 1280, height: 360 })
		);
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
			transform: 'translateX(-50%)',
		});

		const $left = wrapper.getComponent({
			ref: '$left',
		});

		expect($left.props('size')).toStrictEqual(wrapper.props('size'));
		expect($left.props('rsc')).toStrictEqual(wrapper.props('to'));

		const $right = wrapper.getComponent({
			ref: '$right',
		});

		expect($right.props('size')).toStrictEqual(wrapper.props('size'));
		expect($right.props('rsc')).toStrictEqual(wrapper.props('from'));

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transform: 'translateX(0)',
			transition: 'transform 800ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Slide, {
			direction: Directions.next,
			totalDuration: 800,
			easing: 'ease-out',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: 1280, height: 360 })
		);
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
		});

		const $left = wrapper.getComponent({
			ref: '$left',
		});

		expect($left.props('size')).toStrictEqual(wrapper.props('size'));
		expect($left.props('rsc')).toStrictEqual(wrapper.props('from'));

		const $right = wrapper.getComponent({
			ref: '$right',
		});

		expect($right.props('size')).toStrictEqual(wrapper.props('size'));
		expect($right.props('rsc')).toStrictEqual(wrapper.props('to'));

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transform: 'translateX(-50%)',
			transition: 'transform 800ms ease-out',
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});
});
