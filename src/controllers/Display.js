export default class Display {
	constructor(vf) {
		this.vf = vf;
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		if (!this.vf.config.allowFullscreen)
			return;

		const methods = [
			'requestFullscreen',
			'mozRequestFullScreen',
			'webkitRequestFullscreen',
			'msRequestFullscreen',
		];

		const { $container } = this.vf;

		methods.find(method => method in $container? $container[method]() || true : false);

		this.vf.$emit('fullscreen-enter');
	}

	async exitFullScreen() {
		const methods = [
			'exitFullscreen',
			'mozCancelFullScreen',
			'webkitExitFullscreen',
			'msExitFullscreen',
		];

		methods.find(method => method in document? document[method]() || true : false);

		this.vf.$emit('fullscreen-exit');
	}

}
