import { vi } from 'vitest';
import { type Ref, ref, shallowReactive } from 'vue';
import type { VueFluxConfig, VueFluxEmits } from '../../../components/VueFlux/types';
import { PlayerResource, PlayerTransition, Statuses, Timers } from '../..';
import { Resources, Transitions } from '../../../repositories';
import type { FluxComponent } from '../../../components/types';

export default class Player {
	resource: PlayerResource;
	transition: PlayerTransition;

	status: Ref<keyof typeof Statuses> = ref(Statuses.stopped);
	config: VueFluxConfig;
	timers: Timers;
	emit: VueFluxEmits;
	resources: Resources;
	transitions: Transitions;
	$displayComponent: Ref<null | FluxComponent> = ref(null);

	constructor(config: VueFluxConfig, timers: Timers, emit: VueFluxEmits) {
		this.config = config;
		this.timers = timers;
		this.emit = emit;

		this.resources = new Resources(emit);
		this.transitions = new Transitions();
		this.resource = shallowReactive(new PlayerResource());
		this.transition = shallowReactive(new PlayerTransition());
	}

	setup = vi.fn();
	play = vi.fn();
	stop = vi.fn();
	show = vi.fn();
	start = vi.fn();
	end = vi.fn();
}
