import Swipe from './Swipe.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxWrapper/FluxWrapper.vue');

describe('transition: Swipe', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Swipe, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Swipe, {});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(wrapper.props('size'));
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
			justifyContent: 'flex-start',
			left: 0,
			position: 'absolute',
			top: 0,
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			flex: '0 0 auto',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transition: 'width 1400ms ease-in-out',
			width: 0,
		});

		expect(wrapper.vm.totalDuration).toBe(1400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Swipe, {
			direction: Directions.prev,
			totalDuration: 800,
			easing: 'ease-out',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(wrapper.props('size'));
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
			justifyContent: 'flex-end',
			right: 0,
			position: 'absolute',
			top: 0,
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			flex: '0 0 auto',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transition: 'width 800ms ease-out',
			width: 0,
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Swipe, {
			direction: Directions.next,
			totalDuration: 800,
			easing: 'ease-out',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		expect($wrapper.props('size')).toStrictEqual(wrapper.props('size'));
		expect($wrapper.props('css')).toStrictEqual({
			display: 'flex',
			flexWrap: 'nowrap',
			justifyContent: 'flex-start',
			left: 0,
			position: 'absolute',
			top: 0,
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			flex: '0 0 auto',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			transition: 'width 800ms ease-out',
			width: 0,
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});
});
