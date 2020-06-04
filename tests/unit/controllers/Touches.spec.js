import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import TouchesController from '@/controllers/Touches';

describe('TouchesController', () => {
	let ctrl, vf;

	const touchStart = (x, y) => ({
		touches: {
			'0': {
				clientX: x,
				clientY: y,
			},
		},
	})

	const touchEnd = (x, y) => ({
		changedTouches: {
			'0': {
				clientX: x,
				clientY: y,
			},
		},
	})

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions: [
					'fade',
				],
			}
		}).vm;

		ctrl = new TouchesController(vf);
		vf.config.enableGestures = true;
	});

	test('ignores gestures when disabled', () => {
		vf.config.enableGestures = false;

		ctrl.start(touchStart(1, 1));
		expect(ctrl.startTime).toBe(0);

		vf.show = jest.fn();

		vf.size.width = 100;
		vf.size.height = 100;

		ctrl.end(touchEnd(vf.size.width + 1, vf.size.height + 1));

		expect(vf.show).not.toHaveBeenCalled();
	});

	test('tap in threshold', () => {
		vf.toggleMouseOver = jest.fn();

		ctrl.start(touchStart(1, 1));
		ctrl.end(touchEnd(1, 1));

		expect(vf.toggleMouseOver).toHaveBeenCalledWith(true);
	});

	test('tap not in threshold', () => {
		vf.toggleMouseOver = jest.fn();

		ctrl.start(touchStart(1, 1));
		ctrl.end(touchEnd(ctrl.tapThreshold + 1, ctrl.tapThreshold + 1));

		expect(vf.toggleMouseOver).not.toHaveBeenCalled();
	});

	test('double tap in threshold', () => {
		ctrl.endTime = Date.now();

		ctrl.start(touchStart(1, 1));
		ctrl.end(touchEnd(1, 1));

		expect(ctrl.doubleTap()).toBe(true);
	});

	test('double tap not in threshold', () => {
		ctrl.endTime = Date.now() - ctrl.doubleTapThreshold - 1;

		ctrl.start(touchStart(1, 1));
		ctrl.end(touchEnd(1, 1));

		expect(ctrl.doubleTap()).toBe(false);
	});

	test('slide left show next image', () => {
		vf.show = jest.fn();
		vf.size.width = 200;
		vf.size.height = 200;

		ctrl.start(touchStart(100, 100));
		ctrl.end(touchEnd(0, 100));

		expect(vf.show).toHaveBeenCalledWith('next');
	});

	test('slide right show previous image', () => {
		vf.show = jest.fn();
		vf.size.width = 200;
		vf.size.height = 200;

		ctrl.start(touchStart(100, 100));
		ctrl.end(touchEnd(200, 100));

		expect(vf.show).toHaveBeenCalledWith('prev');
	});

	test('slide up', () => {
		vf.size.width = 200;
		vf.size.height = 200;

		expect(ctrl.slideUp(-100)).toBe(true);
	});

	test('slide down', () => {
		vf.size.width = 200;
		vf.size.height = 200;

		expect(ctrl.slideDown(100)).toBe(true);
	});

});
