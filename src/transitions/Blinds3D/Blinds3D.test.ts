import Blinds3D from './Blinds3D.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers';
import { Turns } from '../../components/FluxCube';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Blinds3D', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Blinds3D, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('expects to set proper CSS styles before animation', () => {
		const wrapper = AnimationWrapper(Blinds3D, {});

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
		const wrapper = AnimationWrapper(Blinds3D, {});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 800ms ease-out 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backr);

		expect($tiles[5].setCss).toHaveBeenCalledWith({
			transition: 'all 800ms ease-out 750ms',
		});
		expect($tiles[5].turn).toHaveBeenCalledWith(Turns.backr);

		expect(wrapper.vm.totalDuration).toBe(1700);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Blinds3D, {
			direction: Directions.prev,
			cols: 8,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'ease-in',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in 420ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backl);

		expect($tiles[7].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in 0ms',
		});
		expect($tiles[7].turn).toHaveBeenCalledWith(Turns.backl);

		expect(wrapper.vm.totalDuration).toBe(880);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Blinds3D, {
			direction: Directions.next,
			cols: 10,
			tileDuration: 400,
			tileDelay: 60,
			easing: 'linear',
		});

		const $grid = wrapper.getComponent({
			ref: '$grid',
		});

		wrapper.vm.onPlay();

		expect($grid.vm.transform).toHaveBeenCalledOnce();

		const { $tiles } = $grid.vm;

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms linear 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backr);

		expect($tiles[9].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms linear 540ms',
		});
		expect($tiles[9].turn).toHaveBeenCalledWith(Turns.backr);

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
