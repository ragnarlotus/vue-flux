import { nextTick } from 'vue';

export default class Transitions {
	list = [];
	current = null;
	last = null;

	constructor(vf) {
		this.vf = vf;
	}

	update(transitions) {
		this.list = transitions;
		this.vf.controller.transition.last = this.list.length - 1;
	}

	getNext() {
		let index = this.last + 1;

		if (index >= this.list.length)
			index = 0;

		return index;
	}

	getByIndex(index) {
		if (!index)
			index = this.getNext();

		else if (!this.list[index])
			throw new ReferenceError(`Transition ${index} not found`);

		return this.list[index];
	}

	end() {
		let { vf } = this;

		this.lastIndex = this.currentIndex;
		this.reset();

		nextTick(() => {
			vf.resources.lastIndex = vf.resources.currentIndex;

			if (!vf.config.infinite && vf.resources.lastIndex >= vf.resources.list.length) {
				vf.stop();
				return;
			}

			if (vf.config.autoplay) {
				vf.timers.set('transition', vf.config.delay, () => {
					vf.show();
				});
			}
		});
	}

}
