export default class DisplayController {

	constructor(vf) {
		this.vf = vf;
	}

	get inFullScreen() {
		let props = [
			'fullscreenElement',
			'webkitFullscreenElement',
			'mozFullScreenElement',
			'msFullscreenElement',
		];

		return !!document[props.find(prop => prop in document)];
	}

	toggleFullScreen() {
		this.inFullScreen? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		let { vf } = this;

		if (!this.vf.config.allowFullscreen)
			return;

		let methods = [
			'requestFullscreen',
			'mozRequestFullScreen',
			'webkitRequestFullscreen',
			'msRequestFullscreen',
		];

		let element = vf.$refs.container;

		methods.find((method) => {
			return method in element? element[method]() || true : false;
		});

		vf.$emit('fullscreen-enter');
	}

	async exitFullScreen() {
		let { vf } = this;

		let methods = [
			'exitFullscreen',
			'mozCancelFullScreen',
			'webkitExitFullscreen',
			'msExitFullscreen',
		];

		methods.find((method) => {
			return method in document? document[method]() || true : false;
		});

		vf.$emit('fullscreen-exit');
	}

}
