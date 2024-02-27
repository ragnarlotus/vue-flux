import { ref, Ref } from 'vue';
import { Player, Timers } from '../../controllers';
import { Statuses } from '../../controllers/Player';
import * as Buttons from './buttons';
import FluxControls from './FluxControls.vue';
import { mount } from '@vue/test-utils';
import emit from '../../components/VueFlux/__test__/emit';
import {
	vueFluxConfig,
	setCurrentResource,
	setCurrentTransition,
} from '../__test__/PlayerHelper';

vi.mock('../../controllers/Player/Player');

describe('complements: FluxControls', () => {
	const timers = new Timers();
	const mouseOver: Ref<boolean> = ref(false);

	beforeEach(() => {
		mouseOver.value = false;
	});

	it('should mount properly without slot', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		expect(() => {
			mount(FluxControls, {
				props: {
					mouseOver,
					player,
				},
			});
		}).not.toThrow();
	});

	it('should not be visible if transition running', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player);
		setCurrentTransition(player);

		const wrapper = mount(FluxControls, {
			props: {
				mouseOver,
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-controls"')).toBeFalsy();
	});

	it('should not be visible if transition running and mouse not moving', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player);

		const wrapper = mount(FluxControls, {
			props: {
				mouseOver,
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-controls"')).toBeFalsy();
	});

	it('should be visible if no transition running and mouse moving', () => {
		const player = new Player(vueFluxConfig, timers, emit);

		setCurrentResource(player);

		mouseOver.value = true;

		const wrapper = mount(FluxControls, {
			props: {
				mouseOver,
				player,
			},
		});

		expect(wrapper.html().includes('class="flux-controls"')).toBeTruthy();
	});

	it('should display play button', () => {
		const player = new Player(vueFluxConfig, timers, emit);
		player.status.value = Statuses.stopped;

		setCurrentResource(player);
		mouseOver.value = true;

		const wrapper = mount(FluxControls, {
			props: {
				mouseOver,
				player,
			},
		});

		expect(() => {
			wrapper.getComponent(Buttons.Play);
		}).not.toThrow();
	});

	it('should display stop button', () => {
		const player = new Player(vueFluxConfig, timers, emit);
		player.status.value = Statuses.playing;

		setCurrentResource(player);
		mouseOver.value = true;

		const wrapper = mount(FluxControls, {
			props: {
				mouseOver,
				player,
			},
		});

		expect(() => {
			wrapper.getComponent(Buttons.Stop);
		}).not.toThrow();
	});
});
