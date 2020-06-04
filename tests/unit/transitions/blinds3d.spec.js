import { shallowMount } from '@vue/test-utils';
import TransitionBlinds3d from '@/transitions/blinds3d';
import Img from '@/libraries/Img';

describe('TransitionBlinds3d', () => {
	let wrapper, transition, from, to, current, options, tile;

	beforeEach(() => {
		from = new Img('from', 0);
		to = new Img('to', 1);
		current = {
			show: jest.fn(),
			hide: jest.fn(),
		};
		options = {};

		wrapper = shallowMount(TransitionBlinds3d, {
			propsData: {
				size: {
					width: 200,
					height: 200,
				},
				from,
				to,
				current,
				options,
			},
			parentComponent: {
				data: () => ({
					baseStyle: {},
				}),
			},
		});

		transition = wrapper.vm;
		transition.$refs.grid = {
			transform: jest.fn(),
		};

		tile = {
			transform: jest.fn(),
			setCss: jest.fn(),
			turn: jest.fn(),
		};
	});

	test('has total duration', () => {
		expect(transition.totalDuration).toBeGreaterThan(1);
	});

	test('hide current when start', () => {
		transition.$options.played.call(transition);

		expect(transition.current.hide).toHaveBeenCalled();
	});

	test('played transforms grid', () => {
		transition.$options.played.call(transition);

		expect(transition.$refs.grid.transform).toHaveBeenCalled();
	});

	test('gets previous delay', () => {
		expect(transition.getDelayPrev(1)).toBe(600);
	});

	test('gets next delay', () => {
		expect(transition.getDelayNext(1)).toBe(150);
	});

	test('transform tiles', () => {
		transition.$options.played.call(transition);

		const tileTransform = transition.$refs.grid.transform.mock.calls[0][0];

		tileTransform(tile, 0);

		expect(tile.setCss).toHaveBeenCalled();
		expect(tile.turn).toHaveBeenCalled();
	});

	test('display current when finished', () => {
		wrapper.destroy();

		expect(transition.current.show).toHaveBeenCalled();
	});

	test('ignore current if does not exist', () => {
		current.show.mockClear();
		current.hide.mockClear();

		wrapper = shallowMount(TransitionBlinds3d, {
			propsData: {
				size: {
					width: 200,
					height: 200,
				},
				from,
				to,
				options,
			},
			parentComponent: {
				data: () => ({
					baseStyle: {},
				}),
			},
		});

		transition = wrapper.vm;
		transition.$refs.grid = {
			transform: jest.fn(),
		};

		transition.$options.played.call(transition);

		wrapper.destroy();

		expect(current.show).not.toHaveBeenCalled();
		expect(current.hide).not.toHaveBeenCalled();
	});

});
