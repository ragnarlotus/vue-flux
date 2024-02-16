import Wave from './Wave.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers';
import { Turns } from '../../components/FluxCube';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Wave', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Wave, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('expects to set proper CSS styles before animation', () => {
		const wrapper = AnimationWrapper(Wave, {});

		const maskStyle = wrapper.props('maskStyle');
		expect(maskStyle.overflow).toBe('visible');

		const gridCss = wrapper
			.getComponent({
				ref: '$grid',
			})
			.props('css');
		expect(gridCss.perspective).toBeDefined();
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Wave, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 900ms cubic-bezier(0.3, -0.3, 0.735, 0.285) 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.bottom);

		expect($tiles[7].setCss).toHaveBeenCalledWith({
			transition: 'all 900ms cubic-bezier(0.3, -0.3, 0.735, 0.285) 770ms',
		});
		expect($tiles[7].turn).toHaveBeenCalledWith(Turns.bottom);

		expect(wrapper.vm.totalDuration).toBe(1780);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Wave, {
			direction: Directions.prev,
			cols: 6,
			tileDuration: 400,
			tileDelay: 60,
			sideColor: '#999',
			easing: 'ease-out',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-out 300ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.bottom);

		expect($tiles[5].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-out 0ms',
		});
		expect($tiles[5].turn).toHaveBeenCalledWith(Turns.bottom);

		expect(wrapper.vm.totalDuration).toBe(760);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Wave, {
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

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-out 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.bottom);

		expect($tiles[5].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-out 300ms',
		});
		expect($tiles[5].turn).toHaveBeenCalledWith(Turns.bottom);

		expect(wrapper.vm.totalDuration).toBe(760);
	});
});
