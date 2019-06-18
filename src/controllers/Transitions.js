export default class TransitionsController {

	constructor(vf) {
		this.vf = vf;

		this.transitions = [];
		this.current = undefined;
		this.currentIndex = undefined;
		this.lastIndex = undefined;
	}

	get nextIndex() {
		let nextIndex = this.lastIndex + 1;

		if (nextIndex >= this.transitions.length)
			nextIndex = 0;

		return nextIndex;
	}

	get options() {
		return this.transitions[this.currentIndex].options || {};
	}

	update() {
		this.transitions = this.vf.transitions;
		this.lastIndex = this.transitions.length - 1;

		this.vf.$emit('transitions-updated');
	}

	reset() {
		this.lastIndex = this.currentIndex;
		this.current = undefined;
		this.currentIndex = undefined;
	}

	run(transition) {
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

		this.current = this.transitions[this.currentIndex];

		this.vf.$nextTick(() => {
			this.start();
		});
	}

	start() {
		let vf = this.vf;

		vf.$emit('transition-start', this.current);

		let timeout = vf.$refs.transition.getDuration();

		vf.Timers.set('transition', timeout, () => {
			this.end();
		});
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
			let lastImageIndex = vf.Images.count - 1;

			if (vf.config.infinite === false && currentImage.index >= lastImageIndex) {
				vf.stop();
				return;
			}

			if (vf.config.autoplay === true) {
				vf.Timers.set('image', vf.config.delay, () => {
					vf.showImage('next');
				});
			}

			vf.$emit('transition-end', this.transitions[this.lastIndex]);
		});
	}

}
