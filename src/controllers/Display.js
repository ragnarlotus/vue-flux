import DomHelper from '@/libraries/DomHelper.js';

export default class DisplayController {

	constructor(vm) {
		this.vm = vm;
	}

	inFullScreen() {
		let props = [
			'fullscreenElement',
			'webkitFullscreenElement',
			'mozFullScreenElement',
			'msFullscreenElement',
		];

		return document[props.find(prop => prop in document)];
	}

	requestFullScreen(element) {
		let methods = [
			'requestFullscreen',
			'mozRequestFullScreen',
			'webkitRequestFullscreen',
			'msRequestFullscreen',
		];

		methods.find((method) => {
			return method in element? element[method]() || true : false;
		});

		this.vm.$emit('enter-fullscreen');
	}

	exitFullScreen() {
		let methods = [
			'exitFullscreen',
			'mozCancelFullScreen',
			'webkitExitFullscreen',
			'msExitFullscreen',
		];

		methods.find((method) => {
			return method in document? document[method]() || true : false;
		});

		this.vm.$emit('exit-fullscreen');
	}

}
