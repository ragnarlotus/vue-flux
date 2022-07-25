import { nextTick } from 'vue';

export default class Display {
	size = {
		width: null,
		height: null,
	};

	constructor(vf, node) {
		if (node instanceof Element === false) {
			throw new Error(node +' is not an HTML node element');
		}

		this.vf = vf;
		this.node = node;

		this.addResizeListener();
	}

	addResizeListener() {
		window.addEventListener('resize', this.updateSize, {
			passive: true,
		});
	}

	removeResizeListener() {
		window.removeEventListener('resize', this.updateSize);
	}

	async updateSize() {
		Object.assign(this.size, {
			width: null,
			height: null,
		});

		await nextTick();

		let { width, height } = getComputedStyle(this.node);

		if (['auto', null].includes(height)) {
			const [ arWidth, arHeight ] = this.vf.config.aspectRatio.split(':');
			height = width / arWidth * arHeight;
		}

		Object.assign(this.size, {
			width,
			height,
		});
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
	}

	async exitFullScreen() {
		const methods = [
			'exitFullscreen',
			'mozCancelFullScreen',
			'webkitExitFullscreen',
			'msExitFullscreen',
		];

		methods.find(method => method in document? document[method]() || true : false);
	}

}
