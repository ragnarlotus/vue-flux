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
		const { vf: {
			config,
			transitions,
			timers,
		} } = this;

		config.autoplay = true;

		if (!transitions.current.value) {
			timers.set('transition', delay || config.delay, () => {
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

	show(resource = 'next', transition = 'next') {
		const {
			vf: {
				loaded,
				config,
				transitions,
				$displayComponent,
			},
		} = this;

		if (!loaded.value || !$displayComponent.value)
			return;

		if (transitions.current.value !== null) {
			if (config.allowToSkipTransition) {
				transitions.end(true);

				nextTick(() => {
					this.show(resource, transition);
				});
			}

			return;
		}

		transitions.run(transition, resource);
	}

	transitionStart() {
	}


	transitionFinish() {

	}

}
