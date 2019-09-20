export default class TransitionsController {

	constructor(vf) {
		this.vf = vf;
		this.reset(true);
	}

	get current() {
		return this.$current;
	}

	set current(transition) {
		if (this.current)
			this.last = this.current;

		this.$current = transition;
	}

	get next() {
		let index = this.last.index + 1;

		if (index >= this.transitions.length)
			index = 0;

		return this.transitions[index];
	}

	reset(hard = false) {
		if (hard) {
			this.last = undefined;
			this.transitions = [];
		}

		this.current = undefined;
		this.from = undefined;
		this.to = undefined;
	}

	update(transitions) {
		this.reset(true);

		this.transitions = transitions.map((transition, i) => ({
			index: i,
			name: transition.name || transition
		}));

		this.last = this.transitions[this.transitions.length - 1];

		this.vf.$emit('transitions-updated');
	}

	run(transition, from, to) {
		if (transition) {
			transition = transition.name || transition;

			transition = this.transitions.find(each => {
				return each.name === transition;
			});

			if (!transition)
				throw new ReferenceError(`Transition ${transitionName} not found`);

		} else {
			transition = this.next;
		}

		this.from = { ...from };
		this.to = { ...to };
		this.current = transition;
	}

	start() {
		this.vf.Images.current = this.to;

		this.vf.$emit('transition-start', this.current);
	}

	cancel() {
		this.vf.$emit('transition-cancel', this.current);

		this.last = this.current;
		this.reset();
	}

	end() {
		let { vf } = this;

		this.last = this.current;
		this.reset();

		vf.$nextTick(() => {
			let {
				current: currentImage,
				previous: previousImage,
			} = vf.Images;

			if (!vf.config.infinite && currentImage.index >= previousImage.index) {
				vf.stop();
				return;
			}

			if (vf.config.autoplay) {
				vf.Timers.set('image', vf.config.delay, () => {
					vf.show();
				});
			}

			vf.$emit('transition-end', this.current);
		});
	}

}
