import { Ref, ref } from 'vue';
import Timers from '../Timers/Timers';
import { VueFluxConfig } from '../../components';

export default class Mouse {
	isOver: Ref<boolean> = ref(false);

	setup(config: VueFluxConfig, timers: Timers) {
		timers.clear('mouseOver');

		if (config.autohideTime === 0) {
			this.isOver.value = true;
		}
	}

	toggle(config: VueFluxConfig, timers: Timers, over: boolean) {
		if (config.autohideTime === 0) {
			return;
		}

		this.isOver.value = over;

		this[over ? 'over' : 'out'](config, timers);
	}

	out(_config: VueFluxConfig, timers: Timers) {
		timers.clear('mouseOver');
	}

	over(config: VueFluxConfig, timers: Timers) {
		timers.set(
			'mouseOver',
			config.autohideTime,
			() => (this.isOver.value = false)
		);
	}
}
