import { shallowReactive, nextTick } from 'vue';

export default class Player {
	transition = shallowReactive({
		current: null,
		last: null,
	});

	resource = shallowReactive({
		current: null,
		from: null,
		to: null,
	});

	constructor(config, timers) {
		this.config = config;
		this.timers = timers;
	}

	setup(transitions, resources, $displayComponent) {
		this.transitions = transitions;
		this.resources = resources;
		this.$displayComponent = $displayComponent;
	}

	resetTransition() {
		['current', 'last'].forEach((attr) => (this.transition[attr] = null));
	}

	initTransition() {
		this.transition.last = this.transitions.getByIndex(
			this.transitions.list.length - 1
		);

		this.checkPlay();
	}

	resetResource() {
		['current', 'from', 'to'].forEach((attr) => (this.resource[attr] = null));
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

	getDirection(index) {
		if (['prev', 'next'].includes(index)) {
			return index;
		}

		return this.resource.current.index < index ? 'next' : 'prev';
	}

	play(index = 'next', delay = 0) {
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

	show(resourceIndex = 'next', transitionIndex = 'next') {
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
