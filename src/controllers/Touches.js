export default class TouchesController {

	constructor(vf) {
		this.vf = vf;

		this.startX = 0;
		this.startY = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.prevTouchTime = 0;

		// Max distance in pixels from start until end
		this.tapThreshold = 5;

		// Max time in ms from first to second tap
		this.doubleTapThreshold = 200;

		// Distance in percentage to trigger slide
		this.slideTrigger = 0.3;
	}

	start(event) {
		if (!this.vf.config.enableGestures)
			return;

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(event) {
		let { vf } = this;

		this.prevTouchTime = this.endTime;
		this.endTime = Date.now();

		let offsetX = event.changedTouches[0].clientX - this.startX;
		let offsetY = event.changedTouches[0].clientY - this.startY;

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

	tap(offsetX, offsetY) {
		return Math.abs(offsetX) < this.tapThreshold && Math.abs(offsetY) < this.tapThreshold;
	}

	doubleTap() {
		return this.endTime - this.prevTouchTime < this.doubleTapThreshold;
	}

	slideLeft(offsetX) {
		return offsetX < 0 && offsetX < -(this.vf.size.width * this.slideTrigger);
	}

	slideRight(offsetX) {
		return offsetX > 0 && offsetX > this.vf.size.width * this.slideTrigger;
	}

	slideUp(offsetY) {
		return offsetY < 0 && offsetY < -(this.vf.size.height * this.slideTrigger);
	}

	slideDown(offsetY) {
		return offsetY > 0 && offsetY > this.vf.size.height * this.slideTrigger;
	}

}
