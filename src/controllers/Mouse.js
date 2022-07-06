import { ref } from 'vue';

export default class Mouse {
	isOver = ref(false);

	construct(vf) {
		this.vf = vf;

		this.setup();
	}

	setup() {
		this.vf.timers.clear('mouseOver');

		if (this.vf.config.autohideTime === 0)
			this.isOver.value = true;
	}

	toggle(over) {
		if (this.vf.config.autohideTime === 0)
			return;

		this.isOver.value = over;

		this[over? 'over' : 'out']();
	}

	over() {
		this.vf.timers.set('mouseOver', this.vf.config.autohideTime, () => {
			this.isOver.value = false;
		});
	}

	out() {
		this.vf.timers.clear('mouseOver');
	}

}
