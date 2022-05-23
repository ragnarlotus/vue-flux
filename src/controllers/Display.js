import { reactive } from 'vue';

export default class Display {
	size = reactive({});

	constructor(vf, size) {
		this.vf = vf;
		Object.assign(this.size, size);
	}

	static fromNode(vf, node) {
		if (node instanceof Element === false) {
			throw new Error(node +' is not an HTML node element');
		}

		let { width, height } = getComputedStyle(node);

		if (['auto', null].includes(height))
			height = width / vf.config.aspectRatio;

		return new Display(vf, { width, height });
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
