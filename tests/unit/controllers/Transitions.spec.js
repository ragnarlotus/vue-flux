import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import TransitionsController from '@/controllers/Transitions';

describe('TransitionsController', () => {
	let ctrl, wrapper, vf;

	const transitions = [
		'fade',
		'fall',
		'cube',
	];

	beforeEach(() => {
		wrapper = shallowMount(VueFlux, {
			propsData: {
				transitions,
			}
		});

		vf = wrapper.vm;
		ctrl = new TransitionsController(vf);
		ctrl.update(transitions);
	});

	test('get next transition when last is last', () => {
		ctrl.last = ctrl.transitions[2];

		expect(ctrl.next).toBe(ctrl.transitions[0]);
	});

	test('get next transition when last is first', () => {
		ctrl.last = ctrl.transitions[0];

		expect(ctrl.next).toBe(ctrl.transitions[1]);
	});

	test('reset initializes all data', () => {
		ctrl.current = {};
		ctrl.from = {};
		ctrl.to = {};

		ctrl.reset();

		expect(ctrl.current).toBe(undefined);
		expect(ctrl.from).toBe(undefined);
		expect(ctrl.to).toBe(undefined);
	});

	test('hard reset also initializes last and transitions', () => {
		ctrl.last = {};
		ctrl.transitions = [{}, {}];

		ctrl.reset(true);

		expect(ctrl.last).toBe(undefined);
		expect(ctrl.transitions.length).toBe(0);
	});

	test('update transitions resets controller data', () => {
		ctrl.reset = jest.fn();

		ctrl.update(['fade']);

		expect(ctrl.reset).toHaveBeenCalled();
	});

	test('update transitions indexes them', () => {
		for (const transition of ctrl.transitions) {
			expect(transition.index).toBeDefined();
		}
	});

	test('update transitions defines last transition', () => {
		ctrl.update([
			'blinds2d',
			'blinds3d',
			'blocks1',
			'blocks2',
		]);

		expect(ctrl.last.name).toBe('blocks2');
	});

	test('run transition clear transition timer', () => {
		ctrl.vf.Timers.clear = jest.fn();

		ctrl.run(undefined, {}, {});

		expect(ctrl.vf.Timers.clear).toHaveBeenCalled();
	});

	test('run defined and existing transition', () => {
		ctrl.run('fade', {}, {});

		expect(ctrl.current.name).toBe('fade');
	});

	test('run defined but non existing transition', () => {
		expect(() => {
			ctrl.run('asd', {}, {});
		}).toThrow();
	});

	test('run next transition', () => {
		ctrl.run(undefined, {}, {});

		expect(ctrl.current.name).toBe('fade');

		ctrl.end(true);
		ctrl.run(undefined, {}, {});

		expect(ctrl.current.name).toBe('fall');
	});

	test('run transition to next with no direction in options', () => {
		ctrl.run(undefined, {
			index: 0,
		}, {
			index: 1,
		});

		expect(ctrl.current.options.direction).toBe('next');
	});

	test('run transition to previous with no direction in options', () => {
		ctrl.run(undefined, {
			index: 2,
		}, {
			index: 0,
		});

		expect(ctrl.current.options.direction).toBe('prev');
	});

	test('run transition keeping direction if defined in transition options', () => {
		const options = {
			direction: 'prev',
		};

		ctrl.update([{
			name: 'fade',
			options,
		}, {
			name: 'fall',
			options,
		}, {
			name: 'cube',
			options,
		}]);

		ctrl.run(undefined, {
			index: 0,
		}, {
			index: 1,
		});

		expect(ctrl.current.options.direction).toBe('prev');
	});

	test('run transition using parameter direction', () => {
		ctrl.run(undefined, {
			index: 0,
		}, {
			index: 1,
		}, 'prev');

		expect(ctrl.current.options.direction).toBe('prev');
	});

	test('run transition sets current transition', () => {
		expect(ctrl.current).toBe(undefined);

		ctrl.run(undefined, {
			index: 0,
		}, {
			index: 1,
		});

		expect(ctrl.current).toBeDefined();
	});

	test('start transition when ready', () => {
		vf.$refs.transition = {
			start: jest.fn(),
		};

		ctrl.ready();

		expect(vf.$refs.transition.start).toHaveBeenCalled();
	});

	test('start current transitions', () => {
		ctrl.start();

		expect(wrapper.emitted()['transition-start']).toBeTruthy();
	});

	test('end transition updates last', () => {
		ctrl.run(undefined, {
			index: 0,
		}, {
			index: 1,
		});

		const current = ctrl.current;

		ctrl.end();

		expect(current).toBe(ctrl.last);
	});

	test('end transition resets current transition data', () => {
		ctrl.reset = jest.fn();

		ctrl.end();

		expect(ctrl.reset).toHaveBeenCalled();
	});

	test('end transition updates last image', async () => {
		const image1 = { src: 'image1' };
		const image2 = { src: 'image2' };

		ctrl.run(undefined, image1, image2);
		ctrl.start();
		ctrl.end();

		await vf.$nextTick();

		expect(vf.Images.last).toBe(image2);
	});

	test('end transition stops slider if not configured for infinite running', async () => {
		const image1 = {
			index: 0,
			src: 'image1'
		};

		const image2 = {
			index: 1,
			src: 'image2'
		};

		vf.Images.imgs = [ image1, image2 ];
		vf.config.infinite = false;
		vf.stop = jest.fn();

		ctrl.run(undefined, image1, image2);
		ctrl.start();
		ctrl.end();

		await vf.$nextTick();

		expect(vf.stop).toHaveBeenCalled();
	});

	test('end transition sets timer to display next image', async () => {
		const image1 = {
			index: 0,
			src: 'image1'
		};

		const image2 = {
			index: 1,
			src: 'image2'
		};

		vf.Images.imgs = [ image1, image2 ];
		vf.config.autoplay = true;
		vf.show = jest.fn();
		vf.Timers.set = jest.fn();

		ctrl.run(undefined, image1, image2);
		ctrl.start();
		ctrl.end();

		await vf.$nextTick();

		expect(vf.Timers.set).toHaveBeenCalledWith(
			'transition',
			expect.any(Number),
			expect.any(Function)
		);

		const callBack = vf.Timers.set.mock.calls[0][2];
		callBack();

		expect(vf.show).toHaveBeenCalled();
	});

});
