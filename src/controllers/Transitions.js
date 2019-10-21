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
			name: transition.name || transition,
			options: transition.options,
		}));

		this.last = this.transitions[this.transitions.length - 1];

		this.vf.$emit('transitions-updated');
	}

	run(transition, from, to, direction) {
		if (transition) {
			let name = transition.name || transition;

			let found = this.transitions.find(each => each.name === name);

			if (!found)
				throw new ReferenceError(`Transition ${transition} not found`);

			transition = { ...found };

		} else {
			transition = { ...this.next };
		}

		if (!transition.options)
			transition.options = {};

		if (!transition.options.direction) {
			if (!direction)
				direction = from.index < to.index? 'next' : 'prev';

			transition.options.direction = direction;
		}

		this.from = from;
		this.to = to;
		this.current = transition;
	}

	ready() {
		this.vf.$refs.transition.start();
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
