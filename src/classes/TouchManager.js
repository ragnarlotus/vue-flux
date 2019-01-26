export default class TouchManager {

	constructor(vm) {
		this.vm = vm;

		this.startX = 0;
		this.startY = 0;
		this.startTime = 0;
		this.endTime = 0;
	}

	start(event) {
		if (!this.vm.config.enableGestures)
			return;

		if (event.path[1].matches('.mask') || event.path[1].matches('.vue-flux'))
			event.preventDefault();

		this.startTime = Date.now();
		this.startX = event.touches[0].clientX;
		this.startY = event.touches[0].clientY;
	}

	end(event) {
		let vm = this.vm;

		let previousTouchTime = this.endTime;
		this.endTime = Date.now();

		if (this.endTime - previousTouchTime < 200) {
			vm.toggleFullscreen();
			return;
		}

		let offsetX = event.changedTouches[0].clientX - this.startX;
		let offsetY = event.changedTouches[0].clientY - this.startY;

		if (Math.abs(offsetX) < 5 && Math.abs(offsetY) < 5) {
			vm.toggleMouseOver(true);
			return;
		}

		if (!vm.config.enableGestures)
			return;

		event.preventDefault();

		let triggerX = Math.floor(vm.size.width / 3);

		if (offsetX > 0 && offsetX > triggerX) {
			vm.showImage('previous');
			return;
		}

		if (offsetX < 0 && offsetX < -triggerX) {
			vm.showImage('next');
			return;
		}

		if (vm.index === undefined)
			return;

		let triggerY = Math.floor(vm.size.height / 3);

		if (offsetY < 0 && offsetY < -triggerY) {
			vm.index.show();
			return;
		}
	}

}
