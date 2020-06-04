import { shallowMount } from '@vue/test-utils';
import TransitionBlinds2d from '@/transitions/blinds2d';
import Img from '@/libraries/Img';

describe('TransitionBlinds2d', () => {
	let wrapper, transition, from, to, current, options, tile;

	beforeEach(() => {
		from = new Img('from', 0);
		to = new Img('to', 1);
		options = {};

		wrapper = shallowMount(TransitionBlinds2d, {
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

	test('played transforms grid', () => {
		transition.$options.played.call(transition);

		expect(transition.$refs.grid.transform).toHaveBeenCalled();
	});

	test('gets previous delay', () => {
		expect(transition.getDelayPrev(1)).toBe(800);
	});

	test('gets next delay', () => {
		expect(transition.getDelayNext(1)).toBe(100);
	});

	test('transform tiles', () => {
		transition.$options.played.call(transition);

		const tileTransform = transition.$refs.grid.transform.mock.calls[0][0];

		tileTransform(tile, 0);

		expect(tile.transform).toHaveBeenCalled();
	});

});
