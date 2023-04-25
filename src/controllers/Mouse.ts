import { Ref, ref } from 'vue';
import Timers from './Timers';
import { Config } from '../components/VueFlux/types';

export default class Mouse {
	isOver: Ref<boolean> = ref(false);

	setup(config: Config, timers: Timers) {
		timers.clear('mouseOver');

		if (config.autohideTime === 0) {
			this.isOver.value = true;
		}
	}

	toggle(config: Config, timers: Timers, over: boolean) {
		this.isOver.value = over;

		this[over ? 'over' : 'out'](config, timers);
	}

	out(config: Config, timers: Timers) {
		timers.clear('mouseOver');
	}

	over(config: Config, timers: Timers) {
		timers.set(
			'mouseOver',
			config.autohideTime,
			() => (this.isOver.value = false)
		);
	}
}
