import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';

describe('ImagesController', () => {
	let vf;

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions: [
					'fade',
				],
			}
		}).vm;
	});

	test('No style size if no size defined', () => {

	});

	test('aaa', () => {

	});

});
