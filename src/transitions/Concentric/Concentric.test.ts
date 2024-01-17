import Concentric from './Concentric.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxVortex/FluxVortex.vue');

describe('transition: Concentric', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Concentric, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Concentric, {});

		const $vortex = wrapper.getComponent({
			ref: '$vortex',
		});

		wrapper.vm.onPlay();

		expect($vortex.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $vortex.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(90deg)',
			transition: 'all 800ms linear 0ms',
		});

		expect($tiles[6].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(90deg)',
			transition: 'all 800ms linear 900ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1850);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Concentric, {
			direction: Directions.prev,
			circles: 5,
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

		expect($tiles[4].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(-90deg)',
			transition: 'all 400ms ease-out 240ms',
		});

		expect(wrapper.vm.totalDuration).toBe(700);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Concentric, {
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
			transform: 'rotateZ(90deg)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect($tiles[9].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateZ(90deg)',
			transition: 'all 400ms ease-out 540ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
