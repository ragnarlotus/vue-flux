import Camera from './Camera.vue';
import AnimationWrapper from '../__test__/AnimationWrapper';
import { Directions } from '../../controllers/Player';
import { Maths, Size } from '../../shared';

vi.mock('../../components/FluxWrapper/FluxWrapper.vue');

describe('transition: Camera', () => {
	it('exposes onPlay and totalDuration', () => {
		const wrapper = AnimationWrapper(Camera, {});

		const { onPlay, totalDuration } = wrapper.vm;

		expect(typeof onPlay).toBe('function');
		expect(typeof totalDuration).toBe('number');
	});

	it('performs the transition with default options', () => {
		const wrapper = AnimationWrapper(Camera, {});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		const size = wrapper.props('size').toValue() as {
			width: number;
			height: number;
		};
		const diagSize = Maths.diag(size);

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: diagSize, height: diagSize })
		);

		expect($wrapper.props('css')).toStrictEqual({
			boxSizing: 'border-box',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			overflow: 'hidden',
			borderRadius: '50%',
			border: '0 solid #111',
			top: (size.height - diagSize) / 2 + 'px',
			left: (size.width - diagSize) / 2 + 'px',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			alignSelf: 'center',
			flex: 'none',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			borderWidth: '367.5px',
			transition: 'all 400ms cubic-bezier(0.385, 0, 0.795, 0.560) 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(900);
	});

	it('performs the transition with custom options prev', () => {
		const wrapper = AnimationWrapper(Camera, {
			direction: Directions.prev,
			totalDuration: 800,
			easing: 'ease-out',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		const size = wrapper.props('size').toValue() as {
			width: number;
			height: number;
		};
		const diagSize = Maths.diag(size);

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: diagSize, height: diagSize })
		);

		expect($wrapper.props('css')).toStrictEqual({
			boxSizing: 'border-box',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			overflow: 'hidden',
			borderRadius: '50%',
			border: '0 solid #111',
			top: (size.height - diagSize) / 2 + 'px',
			left: (size.width - diagSize) / 2 + 'px',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			alignSelf: 'center',
			flex: 'none',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			borderWidth: '367.5px',
			transition: 'all 350ms ease-out 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(800);
	});

	it('performs the transition with custom options next', () => {
		const wrapper = AnimationWrapper(Camera, {
			direction: Directions.next,
			totalDuration: 1000,
			easing: 'ease-in',
		});

		const $wrapper = wrapper.getComponent({
			ref: '$wrapper',
		});

		const size = wrapper.props('size').toValue() as {
			width: number;
			height: number;
		};
		const diagSize = Maths.diag(size);

		expect($wrapper.props('size')).toStrictEqual(
			new Size({ width: diagSize, height: diagSize })
		);

		expect($wrapper.props('css')).toStrictEqual({
			boxSizing: 'border-box',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			overflow: 'hidden',
			borderRadius: '50%',
			border: '0 solid #111',
			top: (size.height - diagSize) / 2 + 'px',
			left: (size.width - diagSize) / 2 + 'px',
		});

		const $from = wrapper.getComponent({
			ref: '$from',
		});

		expect($from.props('css')).toStrictEqual({
			alignSelf: 'center',
			flex: 'none',
		});

		wrapper.vm.onPlay();

		expect($wrapper.vm.transform).toHaveBeenCalledWith({
			borderWidth: '367.5px',
			transition: 'all 450ms ease-in 0ms',
		});

		expect(wrapper.vm.totalDuration).toBe(1000);
	});
});
