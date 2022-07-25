import { reactive, nextTick } from 'vue';

export default class Controller {
	transition = reactive({
		current: null,
		last: null,
	});

	resource = reactive({
		from: null,
		to: null,
	});

	constructor(vf) {
		this.vf = vf;
	}

	play(index = 'next', delay = 0) {
		const { vf } = this;

		vf.config.autoplay = true;

		if (!this.transition) {
			vf.timers.set('transition', delay || vf.config.delay, () => {
				this.show(index);
			});
		}
	}

	stop(cancelTransition = false) {
		const { vf } = this;

		vf.config.autoplay = false;

		vf.timers.clear('transition');

		if (this.transition && cancelTransition)
			vf.transitions.end(true);
	}

	show(resource = 'next', transition = null) {
		const { vf } = this;

		vf.timers.clear('transition');

		if (!vf.loaded.value || !this.resource.current)
			return;

		if (this.transition.current) {
			if (vf.config.allowToSkipTransition) {
				vf.transitions.end(true);

				nextTick(() => {
					this.show(resource, transition);
				});
			}

			return;
		}

		this.from = from;
		this.to = to;
		this.current = transition;


		let direction = vf.resources.getDirection(resource);

		this.vf.timers.clear('transition');

		if (!transition.options.direction) {
			if (!direction)
				direction = this.resource.from < this.resource.to? 'next' : 'prev';

			transition.options.direction = direction;
		}

		vf.transitions.run(transition, vf.resources.current, resource, direction);

	}

	transitionStart() {
	}


	transitionFinish() {

	}

}
