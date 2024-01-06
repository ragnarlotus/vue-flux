import { shallowReactive, nextTick, Ref, ref } from 'vue';
import {
	Resources,
	Transitions,
	ResourceIndex,
	TransitionIndex,
} from '../../repositories';
import {
	PlayerResource,
	PlayerTransition,
	Directions,
	Direction,
	Statuses,
} from './';
import { FluxComponent, VueFluxConfig, VueFluxEmits } from '../../components';
import { Timers } from '../';

export default class Player {
	resource: PlayerResource;
	transition: PlayerTransition;

	status: Ref<keyof typeof Statuses> = ref(Statuses.stopped);
	config: VueFluxConfig;
	timers: Timers;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit: VueFluxEmits;
	resources: Resources;
	transitions: Transitions;
	$displayComponent: Ref<null | FluxComponent> = ref(null);

	constructor(
		config: VueFluxConfig,
		timers: Timers,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		emit: VueFluxEmits
	) {
		this.config = config;
		this.timers = timers;
		this.emit = emit;

		this.resources = new Resources(emit);
		this.transitions = new Transitions();
		this.resource = shallowReactive(new PlayerResource());
		this.transition = shallowReactive(new PlayerTransition());
	}

	setup($displayComponent: Ref<null | FluxComponent>) {
		this.$displayComponent = $displayComponent;
	}

	play(resourceIndex: number | Direction = Directions.next, delay?: number) {
		const { config, timers, resource } = this;

		this.status.value = Statuses.playing;

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

		this.emit('play', resourceIndex, delay);
	}

	async stop(cancelTransition: boolean = false) {
		const { timers } = this;

		this.status.value = Statuses.stopped;

		timers.clear('transition');

		if (this.transition.current !== null && cancelTransition === true) {
			await this.end(cancelTransition);
		}

		this.emit('stop');
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

		if (resource.currentSameAs(resourceTo)) {
			return;
		}

		resource.prepareTo(resourceTo);

		this.timers.clear('transition');

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
					this.resource.from!.index < this.resource.to!.index
						? Directions.next
						: Directions.prev;
			}
		}

		this.transition.current = transition;

		this.emit('show', this.resource, this.transition);
	}

	start() {
		this.resource.current = this.resource.to;
		this.emit('transitionStart', this.resource, this.transition);
	}

	async end(cancel: boolean = false) {
		const { config, resource, resources, timers, transition } = this;

		if (resource.current === null || resources === null) {
			return;
		}

		transition.setCurrentFinished();

		await nextTick();

		if (cancel === true) {
			this.emit('transitionCancel', this.resource, this.transition);
		} else {
			this.emit('transitionEnd', this.resource, this.transition);
		}

		if (
			this.shouldStopPlaying(
				config.infinite,
				resource.current,
				resources.list.length - 1
			)
		) {
			this.stop();
			return;
		}

		if (this.shouldPlayNext()) {
			timers.set(
				'transition',
				resource.current.options.delay || config.delay,
				() => {
					this.show();
				}
			);
		}
	}

	private shouldStopPlaying(
		infinite: boolean,
		currentResource: ResourceIndex,
		totalResources: number
	) {
		if (
			infinite === false &&
			currentResource.index >= totalResources &&
			this.status.value === Statuses.playing
		) {
			return true;
		}

		if (currentResource.options.stop === true) {
			return true;
		}

		return false;
	}

	private shouldPlayNext() {
		if (this.status.value === Statuses.playing) {
			return true;
		}

		return false;
	}
}
