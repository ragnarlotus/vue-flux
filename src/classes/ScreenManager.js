export default class ScreenManager {

	constructor(vm) {
		this.vm = vm;
	}

	inFullScreen() {
		let props = [
			'fullscreenElement',
			'webkitFullscreenElement',
			'mozFullScreenElement',
			'msFullscreenElement'
		];

		return props.some(prop => prop in document);
	}

	requestFullScreen(element) {
		let methods = [
			'mozRequestFullScreen',
			'webkitRequestFullscreen',
			'requestFullscreen',
			'msRequestFullscreen'
		];

		methods.find((method) => {
			return method in element? element[method]() || true : false;
		});

		this.vm.$emit('VueFlux-EnterFullscreen', this.vm);
	}

	exitFullScreen() {
		let methods = [
			'exitFullscreen',
			'mozCancelFullScreen',
			'webkitExitFullscreen',
			'msExitFullscreen'
		];

		methods.find((method) => {
			return method in document? document[method]() || true : false;
		});

		this.vm.$emit('VueFlux-ExitFullscreen', this.vm);
	}

}
