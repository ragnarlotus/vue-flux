import { ref, type Ref } from 'vue';
import { Player, Timers } from '../../controllers';
import { Directions, Statuses } from '../../controllers/Player';
import * as Buttons from './buttons';
import FluxControls from './FluxControls.vue';
import { mount } from '@vue/test-utils';
import emit from '../../components/VueFlux/__test__/emit';
import { vueFluxConfig, setCurrentResource, setCurrentTransition } from '../__test__/PlayerHelper';

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

	it('should play when button pressed', async () => {
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

		await wrapper.getComponent(Buttons.Play).trigger('click');

		expect(player.play).toHaveBeenCalledWith(Directions.next, expect.any(Number));
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

	it('should stop when button pressed', async () => {
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

		await wrapper.getComponent(Buttons.Stop).trigger('click');

		expect(player.stop).toHaveBeenCalledOnce();
	});

	it('should display previous resource when button pressed', async () => {
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

		await wrapper.getComponent(Buttons.Prev).trigger('click');

		expect(player.show).toHaveBeenCalledWith(Directions.prev);
	});

	it('should display next resource when button pressed', async () => {
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

		await wrapper.getComponent(Buttons.Next).trigger('click');

		expect(player.show).toHaveBeenCalledWith(Directions.next);
	});
});
