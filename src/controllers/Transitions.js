export default class TransitionsController {

	constructor(vf) {
		this.vf = vf;

		this.current = undefined;
		this.last = undefined;
		this.names = [];
		this.count = 0;
	}

	update() {
		let vf = this.vf;

		let transitions = vf.transitions;

		Object.assign(vf.$options.components, transitions);

		this.names = Object.keys(transitions);
		this.count = this.names.length;

		if (this.count > 0)
			this.last = this.count - 1;

		vf.$emit('vf-transitions-updated', vf);
	}

	next() {
		if (this.count === 0)
			return undefined;

		let index = this.last + 1;

		if (index >= this.count)
			index = 0;

		return this.names[index];
	}

	set(transition) {
		if (transition === undefined)
			transition = this.next();

		if (transition) {
			this.last = this.names.indexOf(transition);
			this.current = transition;
		}

		this.vf.$nextTick(() => {
			this.start(transition);
		});
	}

	setOptions(transition, transitionOptions = {}) {
		let userOptions = {};

		if (this.vf.transitionOptions && this.vf.transitionOptions[this.current])
			userOptions = this.vf.transitionOptions[this.current];

		if (transitionOptions.direction === undefined) {
			let currentImage = this.vf.Images.current;
			let nextImage = this.vf.Images.next;

			transitionOptions.direction = nextImage.index < currentImage.index? 'left' : 'right';
		}

		Object.assign(transition, transitionOptions, userOptions);
	}

	start(transition) {
		let vf = this.vf;

		vf.$emit('vf-transition-start', vf, transition);

		let timeout = 0;

		if (transition !== undefined)
			timeout = vf.$refs.transition.totalDuration;

		vf.Timers.set('transition', timeout, () => {
			this.end(transition);
		});
	}

	end(transition) {
		let vf = this.vf;

		let currentImage = vf.Images.current;
		let nextImage = vf.Images.next;

		currentImage.setCss({ zIndex: 10 });
		nextImage.setCss({ zIndex: 11 });

		this.current = undefined;

		vf.$nextTick(() => {
			if (vf.config.infinite === false && nextImage.index >= vf.Images.count - 1) {
				vf.stop();
				return;
			}

			if (vf.config.autoplay === true) {
				vf.Timers.set('image', vf.config.delay, () => {
					vf.showImage('next');
				});
			}

			vf.$emit('vf-transition-end', vf, transition);
		});
	}

}
