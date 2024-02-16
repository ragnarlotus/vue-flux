import Blocks2 from './Blocks2.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Blocks2', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Blocks2, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Blocks2, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'scale(0.3)',
			transition: 'all 800ms ease 0ms',
		});

		expect($tiles[31].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'scale(0.3)',
			transition: 'all 800ms ease 800ms',
		});

		expect(wrapper.vm.totalDuration).toBe(2080);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Blocks2, {
			direction: Directions.prev,
			rows: 3,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-in-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '1',
			transform: 'scale(1)',
			transition: 'all 400ms ease-in-out 480ms',
		});

		expect($tiles[17].transform).toHaveBeenCalledWith({
			opacity: '1',
			transform: 'scale(1)',
			transition: 'all 400ms ease-in-out 60ms',
		});

		expect(wrapper.vm.totalDuration).toBe(940);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Blocks2, {
			direction: Directions.next,
			rows: 4,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-in-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'scale(0.3)',
			transition: 'all 400ms ease-in-out 0ms',
		});

		expect($tiles[23].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'scale(0.3)',
			transition: 'all 400ms ease-in-out 480ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
