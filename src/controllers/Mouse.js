import { ref } from 'vue';

export default class Mouse {
	isOver = ref(false);

	constructor(config, timers) {
		this.config = config;
		this.timers = timers;
	}

	setup() {
		this.timers.clear('mouseOver');

		if (this.config.autohideTime === 0) {
			this.isOver.value = true;
		}
	}

	toggle(over) {
		if (this.config.autohideTime === 0) {
			return;
		}
		console.log(over);
		this.isOver.value = over;

		this[over ? 'over' : 'out']();
	}

	out() {
		this.timers.clear('mouseOver');
	}

	over() {
		this.timers.set(
			'mouseOver',
			this.config.autohideTime,
			() => (this.isOver.value = false)
		);
	}
}
