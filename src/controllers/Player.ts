import { shallowReactive, nextTick, Ref } from 'vue';
import { VueFluxConfig } from '../types';
import Resource from '../resources/Resource';
import ResourceRepository from '../repositories/ResourceRepository';
import TransitionRepository from '../repositories/TransitionRepository';
import Timers from './Timers';

class Player {
	transition: {
		current: Object | null;
		last: Object | null;
	} = shallowReactive({
		current: null,
		last: null,
	});

	resource: {
		current: Resource | null;
		from: Resource | null;
		to: Resource | null;
	} = shallowReactive({
		current: null,
		from: null,
		to: null,
	});

	config: VueFluxConfig;
	timers: Timers;
	transitions: TransitionsRepository | undefined;
	resources: ResourcesRepository | undefined;
	$displayComponent: Ref<null> | undefined;

	constructor(config: VueFluxConfig, timers: Timers) {
		this.config = config;
		this.timers = timers;
	}

	setup(
		transitions: TransitionsRepository,
		resources: ResourcesRepository,
		$displayComponent: Ref<null>
	) {
		this.transitions = transitions;
		this.resources = resources;
		this.$displayComponent = $displayComponent;
	}

	resetTransition() {
		this.transition.current = null;
		this.transition.last = null;
	}

	initTransition() {
		this.transition.last = this.transitions.getByIndex(
			this.transitions.list.length - 1
		);

		this.checkPlay();
	}

	resetResource() {
		this.resource.current = null;
		this.resource.from = null;
		this.resource.to = null;
	}

	initResource() {
		this.resource.current = this.resources.getByIndex(0);

		this.checkPlay();
	}

	checkPlay() {
		if (!this.config.autoplay) {
			return;
		}

		if (this.transition.last === null) {
			return;
		}

		if (this.resource.current === null) {
			return;
		}

		this.play();
	}

	getDirection(index: string | number) {
		if (['prev', 'next'].includes(index.toString())) {
			return index;
		}

		return this.resource.current.index < index ? 'next' : 'prev';
	}

	play(index: string | number = 'next', delay: number = 0) {
		const { config, timers } = this;

		config.autoplay = true;

		if (this.transition.current === null) {
			timers.set('transition', delay || config.delay, () => {
				this.show(index);
			});
		}
	}

	stop(cancelTransition = false) {
		const { config, timers } = this;

		config.autoplay = false;

		timers.clear('transition');

		if (this.transition.current !== null && cancelTransition) {
			this.end();
		}
	}

	show(
		resourceIndex: string | number = 'next',
		transitionIndex: string | number = 'next'
	) {
		const { resources, config, transitions, $displayComponent } = this;

		if (resources.list.length === 0 || $displayComponent.value === null) {
			return;
		}

		if (this.transition.current !== null) {
			if (config.allowToSkipTransition) {
				this.end();

				nextTick(() => {
					this.show(resourceIndex, transitionIndex);
				});
			}

			return;
		}

		const resourceTo = resources.getByIndex(
			resourceIndex,
			this.resource.current
		);

		if (this.resource.current.index === resourceTo.index) {
			return;
		}

		this.timers.clear('transition');

		this.resource.from = this.resource.current;
		this.resource.to = resourceTo;

		const transition = transitions.getByIndex(
			transitionIndex,
			this.transition.last
		);

		if (!transition.options.direction) {
			transition.options.direction = this.getDirection(resourceIndex);
		}

		this.transition.current = transition;
	}

	start() {
		this.resource.current = this.resource.to;
	}

	end() {
		const { config, resources, timers } = this;

		this.transition.last = this.transition.current;
		this.transition.current = null;

		nextTick(() => {
			if (
				!config.infinite &&
				this.resource.current.index >= resources.list.length - 1
			) {
				this.stop();
				return;
			}

			if (config.autoplay) {
				timers.set('transition', config.delay, () => {
					this.show();
				});
			}
		});
	}
}

export default Player;
