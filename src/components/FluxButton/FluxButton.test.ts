import FluxButton from './FluxButton.vue';
import { mount } from '@vue/test-utils';

describe('component: FluxButton', () => {
	it('should mount properly', () => {
		const nextLine = '<polyline points="36,18 78,50 36,82" />';

		const wrapper = mount(FluxButton, {
			slots: {
				default: nextLine,
			},
		});

		expect(
			wrapper.html().includes('<polyline points="36,18 78,50 36,82"')
		).toBeTruthy();
	});
});
