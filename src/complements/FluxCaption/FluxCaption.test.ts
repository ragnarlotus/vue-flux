import { Player, Timers } from '../../controllers';
import FluxCaption from './FluxCaption.vue';
import { mount } from '@vue/test-utils';
import emit from '../../components/VueFlux/__test__/emit';
import {
	vueFluxConfig,
	setCurrentResource,
	setCurrentTransition,
} from '../__test__/PlayerHelper';

vi.mock('../../controllers/Player/Player');

const defaultCaption = 'the caption';

describe('complements: FluxCaption', () => {
	const timers = new Timers();

	it('should mount properly without slot', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		expect(() => {
			mount(FluxCaption, {
				props: {
					player,
				},
			});
		}).not.toThrow();
	});

	it('should not be visible if no caption', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player);

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-caption"')).toBeTruthy();
	});

	it('should not be visible if caption has no length', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player, '');

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-caption"')).toBeTruthy();
	});

	it('should not be visible if transition running', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player, defaultCaption);
		setCurrentTransition(player);

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-caption"')).toBeTruthy();
	});

	it('should display the caption', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player, defaultCaption);

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
		});

		expect(
			wrapper.html().includes('class="flux-caption visible"')
		).toBeTruthy();
	});

	it('should mount properly with slot', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player, defaultCaption);

		const wrapper = mount(FluxCaption, {
			props: {
				player,
			},
			slots: {
				default: `<h1>{{ params.caption }}</h1>`,
			},
		});

		expect(
			wrapper.html().includes(`<h1>${defaultCaption}</h1>`)
		).toBeTruthy();
	});
});
