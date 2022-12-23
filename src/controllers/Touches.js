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

	setup(config, display, controller, mouse) {
		this.config = config;
		this.display = display;
		this.controller = controller;
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
			this.controller.show('prev');
		} else if (this.slideLeft(offsetX)) {
			this.controller.show('next');
		}
	}

	tap = (offsetX, offsetY) =>
		Math.abs(offsetX) < this.tapThreshold &&
		Math.abs(offsetY) < this.tapThreshold;

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
