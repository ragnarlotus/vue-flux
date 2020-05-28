import { shallowMount } from '@vue/test-utils';
import TransitionBlocks2 from '@/transitions/blocks2';
import Img from '@/libraries/Img';

describe('TransitionBlocks2', () => {
	let wrapper, transition, from, to, current, options, tile;

	beforeEach(() => {
		from = new Img('from', 0);
		to = new Img('to', 1);
		current = {
			show: jest.fn(),
			hide: jest.fn(),
		};
		options = {};

		wrapper = shallowMount(TransitionBlocks2, {
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
			getRowNumber: jest.fn().mockReturnValue(3),
			getColNumber: jest.fn().mockReturnValue(4),
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


	test('transform tiles', () => {
		transition.$options.played.call(transition);

		const tileTransform = transition.$refs.grid.transform.mock.calls[0][0];

		tileTransform(tile, 0);

		expect(tile.transform).toHaveBeenCalled();
	});

});
