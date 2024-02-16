import Blinds2D from './Blinds2D.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Blinds2D', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Blinds2D, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Blinds2D, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'scaleX(0)',
			transition: 'all 800ms linear 0ms',
		});

		expect($tiles[9].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'scaleX(0)',
			transition: 'all 800ms linear 900ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1800);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Blinds2D, {
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
			transform: 'scaleX(0)',
			transition: 'all 400ms ease-out 300ms',
		});

		expect($tiles[5].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'scaleX(0)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(760);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Blinds2D, {
			direction: Directions.next,
			cols: 6,
			tileDuration: 700,
			tileDelay: 90,
			easing: 'ease-in',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'scaleX(0)',
			transition: 'all 700ms ease-in 0ms',
		});

		expect($tiles[5].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'scaleX(0)',
			transition: 'all 700ms ease-in 450ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1240);
	});
});
