import { shallowReactive, nextTick, Ref, ref, Component } from 'vue';
import { Direction } from './types';
import Directions from './Directions';
import { Resources, Transitions } from '../../repositories';
import { PlayerResource, PlayerTransition } from './';
import { Config } from '../../components/VueFlux/types';
import { ResourceIndex } from '../../repositories/Resources/types';
import { TransitionIndex } from '../../repositories/Transitions/types';
import Timers from '../Timers';

export default class Player {
	resource: PlayerResource;
	transition: PlayerTransition;

	config: Config;
	timers: Timers;
	transitions: Transitions | null = null;
	resources: Resources | null = null;
	$displayComponent: Ref<null | Component> = ref(null);

	constructor(config: Config, timers: Timers) {
		this.config = config;
		this.timers = timers;

		this.resource = shallowReactive(new PlayerResource());
		this.transition = shallowReactive(new PlayerTransition());
	}

	setup(
		resources: Resources,
		transitions: Transitions,
		$displayComponent: Ref<null | Component>
	) {
		this.transitions = transitions;
		this.resources = resources;
		this.$displayComponent = $displayComponent;
	}

	play(resourceIndex: number | Direction = Directions.next, delay?: number) {
		const { config, timers, resource } = this;

		config.autoplay = true;

		if (this.transition.current !== null) {
			return;
		}

		const rsc = this.resources?.find(resourceIndex, resource.current?.index);

		timers.set(
			'transition',
			delay || rsc?.options.delay || config.delay,
			() => {
				this.show(resourceIndex);
			}
		);
	}

	stop(cancelTransition: boolean = false) {
		const { config, timers } = this;

		config.autoplay = false;

		timers.clear('transition');

		if (this.transition.current !== null && cancelTransition === true) {
			this.end(cancelTransition);
		}
	}

	isReadyToShow() {
		if (this.resource.current === null) {
			throw new ReferenceError('Current resource not set');
		}

		if (this.resources === null) {
			throw new ReferenceError('Resources list not set');
		}

		if (this.resources.list.length === 0) {
			throw new RangeError('Resources list empty');
		}

		if (this.transition.last === null) {
			throw new ReferenceError('Last transition not set');
		}

		if (this.transitions === null) {
			throw new ReferenceError('Transitions list not set');
		}

		if (this.transitions.list.length === 0) {
			throw new RangeError('Transitions list empty');
		}

		if (this.$displayComponent.value === null) {
			throw new ReferenceError('Display component not set');
		}

		return true;
	}

	async show(
		resourceIndex: number | Direction = Directions.next,
		transitionIndex: number | Direction = Directions.next
	) {
		if (!this.isReadyToShow()) {
			return;
		}

		const { resource, resources, config, transitions } = this;

		if (this.transition.current !== null) {
			if (config.allowToSkipTransition) {
				await this.end(true);

				this.show(resourceIndex, transitionIndex);
			}

			return;
		}

		const resourceTo: ResourceIndex = resources!.find(
			resourceIndex,
			resource.current!.index
		);

		if (resource.current!.index === resourceTo.index) {
			return;
		}

		this.timers.clear('transition');

		this.resource.from = resource.current;
		this.resource.to = resourceTo;

		const transition: TransitionIndex =
			typeof transitionIndex === 'number'
				? transitions!.getByIndex(transitionIndex)
				: transitions!.getByOrder(
						transitionIndex,
						this.transition.last!.index
				  );

		if (transition.options.direction === undefined) {
			if (typeof resourceIndex !== 'number') {
				transition.options.direction = resourceIndex;
			} else {
				transition.options.direction =
					this.resource.from!.index < this.resource.to.index
						? Directions.next
						: Directions.prev;
			}
		}

		this.transition.current = transition;
	}

	start() {
		this.resource.current = this.resource.to;
	}

	async end(cancel: boolean = false) {
		const { config, resource, resources, timers, transition } = this;

		if (resource.current === null || resources === null) {
			return;
		}

		transition.last = transition.current;
		transition.current = null;

		await nextTick();

		if (
			config.infinite === false &&
			resource.current.index >= resources.list.length - 1
		) {
			this.stop();
			return;
		}

		if (config.autoplay === true && cancel === false) {
			timers.set(
				'transition',
				resource.current.options.delay || config.delay,
				() => {
					this.show();
				}
			);
		}
	}
}
