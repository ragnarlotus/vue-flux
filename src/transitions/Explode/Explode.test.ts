import Explode from './Explode.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Explode', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Explode, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Explode, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		const maskStyle = wrapper.props('maskStyle');
		expect(maskStyle.overflow).toBe('visible');

		const gridCss = wrapper
			.getComponent({
				ref: '$grid',
			})
			.props('css');
		expect(gridCss.overflow).toBe('visible');

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 300ms linear 500ms',
		});

		expect($tiles[21].transform).toHaveBeenCalledWith({
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 300ms linear 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Explode, {
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
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 400ms ease-in-out 150ms',
		});

		expect($tiles[8].transform).toHaveBeenCalledWith({
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 400ms ease-in-out -30ms',
		});

		expect(wrapper.vm.totalDuration).toBe(540);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Explode, {
			direction: Directions.next,
			rows: 4,
			cols: 7,
			tileDuration: 200,
			tileDelay: 80,
			easing: 'ease-in',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 200ms ease-in 280ms',
		});

		expect($tiles[13].transform).toHaveBeenCalledWith({
			borderRadius: '100%',
			opacity: '0',
			transform: 'scale(2)',
			transition: 'all 200ms ease-in 200ms',
		});

		expect(wrapper.vm.totalDuration).toBe(880);
	});
});
