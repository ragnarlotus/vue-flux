import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import TransitionsController from '@/controllers/Transitions';

describe('TransitionsController', () => {
	let ctrl, vf;

	const transitions = [
		'fade',
		'fall',
		'cube',
	];

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions,
			}
		}).vm;

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
	});

	test('hard reset also initializes last and transitions', () => {
	});

	test('update transitions resets controller data', () => {
	});

});
