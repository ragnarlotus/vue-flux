import Zip from './Zip.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Zip', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Zip, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Zip, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(100%)',
			transition: 'all 600ms ease-in 0ms',
		});

		expect($tiles[9].transform).toHaveBeenCalledWith({
			opacity: '0.1',
			transform: 'translateY(-100%)',
			transition: 'all 600ms ease-in 720ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Zip, {
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
			transform: 'translateY(-100%)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(760);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Zip, {
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
			transform: 'translateY(-100%)',
			transition: 'all 400ms ease-out 300ms',
		});

		expect(wrapper.vm.totalDuration).toBe(760);
	});
});
