export default class TransitionsController {

	constructor(vf) {
		this.vf = vf;

		this.names = [];
		this.count = 0;
		this.current = undefined;
		this.last = undefined;
	}

	get next() {
		let nextIndex = this.names.indexOf(this.last) + 1;

		if (nextIndex >= this.count)
			nextIndex = 0;

		return this.names[nextIndex];
	}

	get options() {
		let options = this.vf.transitionOptions[this.current] || {};

		let currentImage = this.vf.Images.current;
		let nextImage = this.vf.Images.next;

		options.direction = nextImage.index < currentImage.index? 'left' : 'right';

		return options;
	}

	update() {
		let vf = this.vf;

		let transitions = vf.transitions;

		Object.assign(vf.$options.components, transitions);

		this.names = Object.keys(transitions);
		this.count = this.names.length;
		this.last = this.names[this.count - 1];

		vf.$emit('transitions-updated');
	}

	run(transition) {
		if (transition === undefined)
			transition = this.next;

		this.current = transition;

		this.vf.$nextTick(() => {
			this.start(transition);
		});
	}

	start() {
		let vf = this.vf;

		vf.$emit('transition-start', this.current);

		let timeout = vf.$refs.transition.totalDuration;

		vf.Timers.set('transition', timeout, () => {
			this.end();
		});
	}

	end() {
		this.last = current;
		this.current = undefined;

		vf.$nextTick(() => {
			let vf = this.vf;
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

			vf.$emit('transition-end', this.last);
		});
	}

}
