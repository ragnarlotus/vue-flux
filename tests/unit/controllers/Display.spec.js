import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import DisplayController from '@/controllers/Display';

describe('DisplayController', () => {
	let ctrl, vf;

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions: [
					'fade',
				],
			}
		}).vm;

		ctrl = new DisplayController(vf);
		vf.config.allowFullscreen = true;
		vf.$refs.container.requestFullscreen = jest.fn();
		document.exitFullscreen = jest.fn();
	});

	test('detects in full screen', () => {
		document.fullscreenElement = {};

		expect(ctrl.inFullScreen).toBe(true);
	});

	test('detects not in full screen', () => {
		document.fullscreenElement = undefined;

		expect(ctrl.inFullScreen).toBe(false);
	});

	test('changes to full screen', async () => {
		await ctrl.enterFullScreen();

		expect(vf.$refs.container.requestFullscreen).toHaveBeenCalled();
	});

	test('does not changes to full screen if disabled', async () => {
		vf.config.allowFullscreen = false;

		await ctrl.enterFullScreen();

		expect(vf.$refs.container.requestFullscreen).not.toHaveBeenCalled();
	});

	test('exits from full screen', async () => {
		await ctrl.exitFullScreen();

		expect(document.exitFullscreen).toHaveBeenCalled();
	});

	test('toggle full screen when not in full screen', () => {
		document.fullscreenElement = undefined;
		ctrl.enterFullScreen = jest.fn();

		ctrl.toggleFullScreen();

		expect(ctrl.enterFullScreen).toHaveBeenCalled();
	});

	test('toggle full screen when in full screen', () => {
		document.fullscreenElement = {};
		ctrl.exitFullScreen = jest.fn();

		ctrl.toggleFullScreen();

		expect(ctrl.exitFullScreen).toHaveBeenCalled();
	});

});
