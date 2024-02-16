import Round1 from './Round1.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';
import { Turns } from '../../components/FluxCube';

vi.mock('../../components/FluxGrid/FluxGrid.vue');

describe('transition: Round1', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Round1, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Round1, {});

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

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 800ms ease-out 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backr);

		expect($tiles[9].setCss).toHaveBeenCalledWith({
			transition: 'all 800ms ease-out 300ms',
		});
		expect($tiles[9].turn).toHaveBeenCalledWith(Turns.backr);

		expect(wrapper.vm.totalDuration).toBe(2400);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Round1, {
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

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in-out 480ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backl);

		expect($tiles[17].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in-out 60ms',
		});
		expect($tiles[17].turn).toHaveBeenCalledWith(Turns.backl);

		expect(wrapper.vm.totalDuration).toBe(720);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Round1, {
			direction: Directions.next,
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

		expect($tiles[0].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in-out 0ms',
		});
		expect($tiles[0].turn).toHaveBeenCalledWith(Turns.backr);

		expect($tiles[17].setCss).toHaveBeenCalledWith({
			transition: 'all 400ms ease-in-out 420ms',
		});
		expect($tiles[17].turn).toHaveBeenCalledWith(Turns.backr);

		expect(wrapper.vm.totalDuration).toBe(720);
	});
});
