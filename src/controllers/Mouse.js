import { ref } from 'vue';

export default class Mouse {
	isOver = ref(false);

	setup(config, timers) {
		this.config = config;
		this.timers = timers;

		this.timers.clear('mouseOver');

		if (this.config.autohideTime === 0)
			this.isOver.value = true;
	}

	toggle(over) {
		if (this.config.autohideTime === 0)
			return;

		this.isOver.value = over;

		this[over? 'over' : 'out']();
	}

	out() {
		this.timers.set('mouseOver', this.config.autohideTime, () => {
			this.isOver.value = false;
		});
	}

	over() {
		this.timers.clear('mouseOver');
	}

}
