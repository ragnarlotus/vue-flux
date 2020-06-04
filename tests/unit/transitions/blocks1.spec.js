import { shallowMount } from '@vue/test-utils';
import TransitionBlocks1 from '@/transitions/blocks1';
import Img from '@/libraries/Img';

describe('TransitionBlocks1', () => {
	let wrapper, transition, from, to, current, options, tile;

	beforeEach(() => {
		from = new Img('from', 0);
		to = new Img('to', 1);
		options = {};

		wrapper = shallowMount(TransitionBlocks1, {
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
		});

		transition = wrapper.vm;
		transition.$refs.grid = {
			transform: jest.fn(),
		};

		tile = {
			transform: jest.fn(),
		};
	});

	test('has total duration', () => {
		expect(transition.totalDuration).toBeGreaterThan(1);
	});

	test('does not calcs rows if defined', () => {
		options.rows = 10;

		wrapper = shallowMount(TransitionBlocks1, {
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
		});

		expect(wrapper.vm.rows).toBe(10);
	});

	test('played transforms grid', () => {
		transition.$options.played.call(transition);

		expect(transition.$refs.grid.transform).toHaveBeenCalled();
	});

	test('gets delay', () => {
		expect(transition.getDelay()).toEqual(expect.any(Number));
	});

	test('transform tiles', () => {
		transition.$options.played.call(transition);

		const tileTransform = transition.$refs.grid.transform.mock.calls[0][0];

		tileTransform(tile, 0);

		expect(tile.transform).toHaveBeenCalled();
	});

});
