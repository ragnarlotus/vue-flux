import { VueFluxConfig } from '../../components';
import { Directions, Display, Mouse, Player, Timers } from '../';

export default class Touches {
	startX = 0;
	startY = 0;
	startTime = 0;
	endTime = 0;
	prevTouchTime = 0;

	// Max distance in pixels from start until end
	tapThreshold = 5;

	// Max time in ms from first to second tap
	doubleTapThreshold = 200;

	// Distance in percentage to trigger slide
	slideTrigger = 0.3;

	start(event: TouchEvent, config: VueFluxConfig) {
		if (!config.enableGestures) {
			return;
		}

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(
		event: TouchEvent,
		config: VueFluxConfig,
		player: Player,
		display: Display,
		timers: Timers,
		mouse: Mouse
	) {
		this.prevTouchTime = this.endTime;
		this.endTime = Date.now();

		const offsetX = event.changedTouches[0].clientX - this.startX;
		const offsetY = event.changedTouches[0].clientY - this.startY;

		if (this.tap(offsetX, offsetY)) {
			mouse.toggle(config, timers, true);
			return;
		}

		if (!config.enableGestures) {
			return;
		}

		if (this.slideRight(offsetX, display)) {
			player.show(Directions.prev);
		} else if (this.slideLeft(offsetX, display)) {
			player.show(Directions.next);
		}
	}

	tap = (offsetX: number, offsetY: number) =>
		Math.abs(offsetX) < this.tapThreshold &&
		Math.abs(offsetY) < this.tapThreshold;

	doubleTap = () =>
		this.endTime - this.prevTouchTime < this.doubleTapThreshold;

	slideLeft = (offsetX: number, display: Display) =>
		display.size.isValid() &&
		offsetX < 0 &&
		offsetX < -(display.size!.width.value! * this.slideTrigger);

	slideRight = (offsetX: number, display: Display) =>
		display.size.isValid() &&
		offsetX > 0 &&
		offsetX > display.size.width.value! * this.slideTrigger;

	slideUp = (offsetY: number, display: Display) =>
		display.size.isValid() &&
		offsetY < 0 &&
		offsetY < -(display.size.height.value! * this.slideTrigger);

	slideDown = (offsetY: number, display: Display) =>
		display.size.isValid() &&
		offsetY > 0 &&
		offsetY > display.size.height.value! * this.slideTrigger;
}
