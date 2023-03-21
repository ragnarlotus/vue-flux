const abs = Math.abs;

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

	constructor(config, display, player, mouse) {
		this.config = config;
		this.display = display;
		this.player = player;
		this.mouse = mouse;
	}

	start(event) {
		if (!this.config.enableGestures) {
			return;
		}

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(event) {
		this.prevTouchTime = this.endTime;
		this.endTime = Date.now();

		const offsetX = event.changedTouches[0].clientX - this.startX;
		const offsetY = event.changedTouches[0].clientY - this.startY;

		if (this.tap(offsetX, offsetY)) {
			this.mouse.toggle(true);
			return;
		}

		if (!this.config.enableGestures) {
			return;
		}

		if (this.slideRight(offsetX)) {
			this.player.start('prev');
		} else if (this.slideLeft(offsetX)) {
			this.player.start('next');
		}
	}

	tap = (offsetX, offsetY) =>
		abs(offsetX) < this.tapThreshold && abs(offsetY) < this.tapThreshold;

	doubleTap = () =>
		this.endTime - this.prevTouchTime < this.doubleTapThreshold;

	slideLeft = (offsetX) =>
		offsetX < 0 && offsetX < -(this.display.size.width * this.slideTrigger);

	slideRight = (offsetX) =>
		offsetX > 0 && offsetX > this.display.size.width * this.slideTrigger;

	slideUp = (offsetY) =>
		offsetY < 0 && offsetY < -(this.display.size.height * this.slideTrigger);

	slideDown = (offsetY) =>
		offsetY > 0 && offsetY > this.display.size.height * this.slideTrigger;
}
