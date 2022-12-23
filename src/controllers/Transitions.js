import { shallowRef, toRaw, nextTick } from 'vue';

//const emit = defineEmits(['transition-start', 'transition-end']);

export default class Transitions {
	list = [];
	last = shallowRef(null);

	setup(config, controller, resources, timers) {
		this.config = config;
		this.controller = controller;
		this.resources = resources;
		this.timers = timers;
	}

	update(transitions) {
		this.list = toRaw(transitions);
		this.last.value = this.getByIndex(this.list.length - 1);

		this.controller.reset();
	}

	getPrevIndex() {
		return this.last.value.index === 0
			? this.list.length - 1
			: this.last.value.index - 1;
	}

	getNextIndex() {
		return this.last.value.index < this.list.length - 1
			? this.last.value.index + 1
			: 0;
	}

	getByIndex(index) {
		if (index === 'prev') {
			index = this.getPrevIndex();
		} else if (index === 'next') {
			index = this.getNextIndex();
		} else if (!this.list[index]) {
			throw new ReferenceError(`Transition ${index} not found`);
		}

		return {
			index,
			component: this.list[index].component ?? this.list[index],
			options: this.list[index].options ?? {},
		};
	}

	run(transitionIndex, toResourceIndex) {
		this.timers.clear('transition');

		this.controller.resource.from = this.resources.current.value;
		this.controller.resource.to = this.resources.getByIndex(toResourceIndex);

		const transition = this.getByIndex(transitionIndex);

		if (!transition.options.direction) {
			transition.options.direction =
				this.resources.getDirection(toResourceIndex);
		}

		this.controller.transition.value = transition;
	}

	start() {
		const { resources, controller } = this;

		resources.current.value = controller.resource.to;

		/* 		emit('transition-start', {
			transition: controller.transition.value,
			from: controller.resource.from,
			to: controller.resource.to,
		}); */
	}

	end() {
		const { config, resources, timers, controller } = this;

		/* 		emit('transition-end', {
			transition: controller.transition.value,
			from: controller.resource.from,
			to: controller.resource.to,
		});
 */
		this.last.value = controller.transition.value;
		resources.last = controller.resource.to;

		controller.reset();

		nextTick(() => {
			if (
				!config.infinite &&
				resources.last.index >= resources.list.length
			) {
				controller.stop();
				return;
			}

			if (config.autoplay) {
				timers.set('transition', config.delay, () => {
					controller.show();
				});
			}
		});
	}
}
