import { ref, reactive, computed, nextTick } from 'vue';

export default class Display {
	ready = ref(false);
	size = reactive({
		width: null,
		height: null,
	});

	constructor(config, resources) {
		this.config = config;
		this.resources = resources;

		this.ready = computed(() => {
			return this.size.width !== null && this.size.height != null;
		});
	}

	setup(node) {
		if (node instanceof Element === false) {
			throw new Error(node + ' is not an HTML node element');
		}

		this.node = node;

		this.updateSize();
	}

	addResizeListener() {
		window.addEventListener('resize', () => this.updateSize(), {
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
		width = parseFloat(width);

		if (['0px', 'auto', null].includes(height)) {
			const [arWidth, arHeight] = this.config.aspectRatio.split(':');
			height = (width / arWidth) * arHeight;
		} else {
			height = parseFloat(height);
		}

		Object.assign(this.size, {
			width,
			height,
		});

		this.resources.list.forEach((rsc) => rsc.adaptToSize(this.size));
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen() ? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		if (!this.config.allowFullscreen) {
			return;
		}

		this.node.requestFullscreen();
	}

	async exitFullScreen() {
		document.exitFullscreen();
	}
}
