import { shallowRef, shallowReactive, nextTick } from 'vue';

export default class Controller {
	transition = shallowRef(null);

	resource = shallowReactive({
		from: null,
		to: null,
	});

	setup(config, transitions, resources, timers, $displayComponent) {
		this.config = config;
		this.transitions = transitions;
		this.resources = resources;
		this.timers = timers;
		this.$displayComponent = $displayComponent;
	}

	reset() {
		this.transition.value = null;
		this.resource.from = null;
		this.resource.to = null;
	}

	play(index = 'next', delay = 0) {
		const { config, timers } = this;

		config.autoplay = true;

		if (!this.transition.value !== null) {
			timers.set('transition', delay || config.delay, () => {
				this.show(index);
			});
		}
	}

	stop(cancelTransition = false) {
		const { config, transitions, timers } = this;

		config.autoplay = false;

		timers.clear('transition');

		if (this.transition.value && cancelTransition) {
			transitions.end();
		}
	}

	show(resource = 'next', transition = 'next') {
		const { resources, config, transitions, $displayComponent } = this;

		if (resources.ready.value === false || $displayComponent.value === null) {
			return;
		}

		if (this.transition.value !== null) {
			if (config.allowToSkipTransition) {
				transitions.end();

				nextTick(() => {
					this.show(resource, transition);
				});
			}

			return;
		}

		transitions.run(transition, resource);
	}
}
