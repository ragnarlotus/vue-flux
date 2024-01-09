import Warp from './Warp.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxVortex/FluxVortex.vue');

describe('transition: Warp', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Warp, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Warp, {});

		const $vortex = wrapper.getComponent({
			ref: '$vortex',
		});

		wrapper.vm.onPlay();

		expect($vortex.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $vortex.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 800ms linear 0ms',
		});

		expect($tiles[6].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 800ms linear 900ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1850);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Warp, {
			direction: Directions.prev,
			circles: 10,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-out',
		});

		const $vortex = wrapper.getComponent({
			ref: '$vortex',
		});

		wrapper.vm.onPlay();

		expect($vortex.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $vortex.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 400ms ease-out 540ms',
		});

		expect($tiles[6].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 400ms ease-out 180ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Warp, {
			direction: Directions.next,
			circles: 10,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-out',
		});

		const $vortex = wrapper.getComponent({
			ref: '$vortex',
		});

		wrapper.vm.onPlay();

		expect($vortex.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $vortex.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect($tiles[6].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 400ms ease-out 360ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
