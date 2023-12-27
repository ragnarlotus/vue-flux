import FluxButton from './FluxButton.vue';
import { mount } from '@vue/test-utils';

describe('Component: FluxButton', () => {
	test('should mount properly', () => {
		const wrapper = mount(FluxButton, {
			slots: {
				default: '<polyline points="36,18 78,50 36,82" />',
			},
		});

		expect(wrapper).toMatchSnapshot();
	});
});
