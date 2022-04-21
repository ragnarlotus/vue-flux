export default class TouchesController {
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

	constructor(vf) {
		this.vf = vf;
	}

	start(event) {
		if (!this.vf.config.enableGestures)
			return;

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(event) {
		const { vf } = this;

		this.prevTouchTime = this.endTime;
		this.endTime = Date.now();

		const offsetX = event.changedTouches[0].clientX - this.startX;
		const offsetY = event.changedTouches[0].clientY - this.startY;

		if (this.tap(offsetX, offsetY)) {
			vf.toggleMouseOver(true);
			return;
		}

		if (!vf.config.enableGestures)
			return;

		if (this.slideRight(offsetX))
			vf.show('prev');

		else if (this.slideLeft(offsetX))
			vf.show('next');
	}

	tap = (offsetX, offsetY) => Math.abs(offsetX) < this.tapThreshold && Math.abs(offsetY) < this.tapThreshold;

	doubleTap = () => this.endTime - this.prevTouchTime < this.doubleTapThreshold;

	slideLeft = offsetX => offsetX < 0 && offsetX < -(this.vf.size.width * this.slideTrigger);

	slideRight = offsetX => offsetX > 0 && offsetX > this.vf.size.width * this.slideTrigger;

	slideUp = offsetY => offsetY < 0 && offsetY < -(this.vf.size.height * this.slideTrigger);

	slideDown = offsetY => offsetY > 0 && offsetY > this.vf.size.height * this.slideTrigger;

}
