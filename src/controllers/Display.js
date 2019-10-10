export default class DisplayController {

	constructor(vf) {
		this.vf = vf;
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

	toggleFullScreen() {
		this.inFullScreen()? this.exitFullScreen() : this.enterFullScreen();
	}

	enterFullScreen() {
		if (!this.vf.config.allowFullscreen)
			return;

		let methods = [
			'requestFullscreen',
			'mozRequestFullScreen',
			'webkitRequestFullscreen',
			'msRequestFullscreen',
		];

		let element = this.vf.$refs.container;

		methods.find((method) => {
			return method in element? element[method]() || true : false;
		});

		this.vf.resize();

		this.vf.$emit('fullscreen-enter');
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

		this.vf.resize();

		this.vf.$emit('fullscreen-exit');
	}

}
