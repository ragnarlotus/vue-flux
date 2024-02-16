import Round2 from './Round2.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Round2', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Round2, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Round2, {});

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
		expect(gridCss.perspective).toBeDefined();

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-540deg)',
			transition: 'all 800ms linear 100ms',
		});

		expect($tiles[9].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-540deg)',
			transition: 'all 800ms linear 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1900);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Round2, {
			direction: Directions.prev,
			rows: 3,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			rotateX: -310,
			easing: 'ease-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-310deg)',
			transition: 'all 400ms ease-out 360ms',
		});

		expect($tiles[17].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-310deg)',
			transition: 'all 400ms ease-out 60ms',
		});

		expect(wrapper.vm.totalDuration).toBe(720);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Round2, {
			direction: Directions.next,
			rows: 3,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			rotateX: -310,
			easing: 'ease-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-310deg)',
			transition: 'all 400ms ease-out 0ms',
		});

		expect($tiles[17].transform).toHaveBeenCalledWith({
			opacity: '0',
			transform: 'rotateY(-310deg)',
			transition: 'all 400ms ease-out 300ms',
		});

		expect(wrapper.vm.totalDuration).toBe(720);
	});
});
