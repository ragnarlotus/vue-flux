export default class TouchesController {

	constructor(vf) {
		this.vf = vf;

		this.startX = 0;
		this.startY = 0;
		this.startTime = 0;
		this.endTime = 0;
		this.previousTouchTime = 0;

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

		// Prevent web scrolling
		if (event.path[1].matches('.mask') || event.path[1].matches('.vue-flux'))
			event.preventDefault();

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(event) {
		let vf = this.vf;

		this.previousTouchTime = this.endTime;
		this.endTime = Date.now();

		if (this.doubleTap()) {
			vf.toggleFullscreen();
			return;
		}

		let offsetX = event.changedTouches[0].clientX - this.startX;
		let offsetY = event.changedTouches[0].clientY - this.startY;

		if (this.tap(offsetX, offsetY)) {
			vf.toggleMouseOver(true);
			return;
		}

		if (!vf.config.enableGestures)
			return;

		// Prevent web scrolling
		event.preventDefault();

		if (this.slideRight(offsetX)) {
			vf.showImage('previous');

		} else if (this.slideLeft(offsetX)) {
			vf.showImage('next');

		} else if (vf.index !== undefined && this.slideUp(offsetY)) {
			vf.index.show();
		}
	}

	tap(offsetX, offsetY) {
		return Math.abs(offsetX) < this.tapThreshold && Math.abs(offsetY) < this.tapThreshold;
	}

	doubleTap() {
		return this.endTime - this.previousTouchTime < this.doubleTapThreshold;
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
