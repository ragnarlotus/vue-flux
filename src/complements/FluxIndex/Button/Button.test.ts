import { type Ref, ref } from 'vue';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('complements: FluxIndex Button', () => {
	const mouseOver: Ref<boolean> = ref(false);

	beforeEach(() => {
		mouseOver.value = false;
	});

	it('mounts properly', () => {
		expect(() => {
			mount(Button, {
				props: {
					mouseOver,
				},
			});
		}).not.toThrow();
	});

	it('is visible when mouse over', () => {
		mouseOver.value = true;

		const wrapper = mount(Button, {
			props: {
				mouseOver,
			},
		});

		expect(wrapper.html().includes('toggle bottom left')).toBeTruthy();
	});

	it('is NOT visible when mouse NOT over', () => {
		const wrapper = mount(Button, {
			props: {
				mouseOver,
			},
		});

		expect(wrapper.html().includes('toggle bottom left')).toBeFalsy();
	});
});
