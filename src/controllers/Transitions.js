export default class TransitionsController {

	constructor(vf) {
		this.vf = vf;

		this.transitions = [];
		this.current = undefined;
		this.currentIndex = undefined;
		this.from = undefined;
		this.to = undefined;
		this.lastIndex = undefined;
	}

	get nextIndex() {
		let nextIndex = this.lastIndex + 1;

		if (nextIndex >= this.transitions.length)
			nextIndex = 0;

		return nextIndex;
	}

	update() {
		this.transitions = this.vf.transitions;
		this.lastIndex = this.transitions.length - 1;

		this.vf.$emit('transitions-updated');
	}

	reset() {
		this.vf.Images.updateLastShown(this.to);

		this.lastIndex = this.currentIndex;
		this.current = undefined;
		this.currentIndex = undefined;
		this.from = undefined;
		this.to = undefined;
	}

	run(transition, from, to) {
		if (transition === undefined) {
			this.currentIndex = this.nextIndex;
			transition = this.transitions[this.currentIndex];

		} else {
			this.currentIndex = this.transitions.indexOf(transition);

			if (this.currentIndex === -1) {
				throw new ReferenceError(`Transition ${transition} not found`);
				return;
			}
		}

		this.from = from;
		this.to = to;
		this.current = this.transitions[this.currentIndex];
	}

	start() {
		let vf = this.vf;

		vf.Images.setCurrentIndex(this.to.index);

		vf.$emit('transition-start', this.current);
	}

	cancel() {
		let vf = this.vf;

		vf.$emit('transition-cancel', this.current);
		vf.Timers.clear('transition');
		this.reset();
	}

	end() {
		let vf = this.vf;

		this.reset();

		vf.$nextTick(() => {
			let currentImage = vf.Images.current;
			let lastImageIndex = vf.Images.props.length - 1;

			if (vf.config.infinite === false && currentImage.index >= lastImageIndex) {
				vf.stop();
				return;
			}

			if (vf.config.autoplay === true) {
				vf.Timers.set('image', vf.config.delay, () => {
					vf.show('next');
				});
			}

			vf.$emit('transition-end', this.transitions[this.lastIndex]);
		});
	}

}
