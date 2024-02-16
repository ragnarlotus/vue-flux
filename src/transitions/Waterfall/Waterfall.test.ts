import Waterfall from './Waterfall.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Waterfall', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Waterfall, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Waterfall, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 600ms cubic-bezier(0.55, 0.055, 0.675, 0.19) 0ms',
		});

		expect($tiles[9].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 600ms cubic-bezier(0.55, 0.055, 0.675, 0.19) 810ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1500);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Waterfall, {
			direction: Directions.prev,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 400ms ease-out 300ms',
		});

		expect($tiles[5].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(760);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Waterfall, {
			direction: Directions.next,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect($tiles[5].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 400ms ease-out 300ms',
		});

		expect(wrapper.vm.totalDuration).toBe(760);
	});
});
