export default class Display {
	constructor(vf) {
		this.vf = vf;
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		let { vf } = this;

		if (!vf.config.allowFullscreen)
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
