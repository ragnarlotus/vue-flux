import { ref, reactive, nextTick } from 'vue';

export default class Transitions {
	list = reactive([]);
	current = ref(null);
	last = ref(null);

	constructor(vf) {
		this.vf = vf;
	}

	update(transitions) {
		this.list.length = 0;
		this.list = transitions;
		this.current.value = null;
		this.last.value = this.list.length - 1;
	}

	getPrevIndex() {
		const index = this.last.value - 1;

		if (index < 0)
			return this.list.length - 1;

		return index;
	}

	getNextIndex() {
		const index = this.last.value + 1;

		if (index >= this.list.length)
			return 0;

		return index;
	}

	getByIndex(index) {
		if (index === 'prev')
			index = this.getPrevIndex();

		else if (index === 'next')
			index = this.getNextIndex();

		else if (!this.list[index])
			throw new ReferenceError(`Transition ${index} not found`);

		return {
			index,
			transition: this.list[index],
		};
	}

	start(transitionIndex, toResourceIndex) {
		const {
			vf: {
				resources,
				timers,
			}
		} = this.vf;

		timers.clear('transition');

		let direction = resources.getDirection(toResourceIndex);

		const { transition } = this.getByIndex(transitionIndex);

		if (transition.options.direction)
			direction = transition.options.direction;

	}

	end() {
		let { vf } = this;

		this.last.value = this.current.value;
		this.current.value = null;

		nextTick(() => {
			vf.resources.last.value = vf.resources.current.value;

			if (!vf.config.infinite && vf.resources.last.value >= vf.resources.list.length) {
				vf.controller.stop();
				return;
			}

			if (vf.config.autoplay) {
				vf.timers.set('transition', vf.config.delay, () => {
					vf.controller.show();
				});
			}
		});
	}

}
