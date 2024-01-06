import { nextTick, Ref, type Component } from 'vue';
import { Size } from '../../shared';
import { VueFluxConfig, VueFluxEmits } from '../../components';

export default class Display {
	node: Ref<null | HTMLElement | Component>;
	config: VueFluxConfig | null;
	emit: null | VueFluxEmits = null;
	size: Size = new Size();

	constructor(
		node: Ref<null | HTMLElement | Component>,
		config: VueFluxConfig | null = null,
		emit: null | VueFluxEmits = null
	) {
		this.node = node;
		this.config = config;
		this.emit = emit;
	}

	static async getSize(node: Ref<null | HTMLElement | Component>) {
		const display = new Display(node);
		await display.updateSize();

		return display.size;
	}

	addResizeListener() {
		window.addEventListener('resize', () => this.updateSize(), {
			passive: true,
		});
	}

	removeResizeListener() {
		window.removeEventListener('resize', this.updateSize);
	}

	getAspectRatio() {
		if (this.config !== null) {
			const [width, height] = this.config.aspectRatio.split(':');

			return [parseFloat(width), parseFloat(height)];
		}

		return [16, 9];
	}

	async updateSize() {
		this.size.reset();

		await nextTick();

		if (this.node.value === null) {
			return;
		}

		const computedStyle = getComputedStyle(this.node.value as HTMLElement);

		const width = parseFloat(computedStyle.width);
		let height = parseFloat(computedStyle.height);

		if (['0px', 'auto', null].includes(computedStyle.height)) {
			const [arWidth, arHeight] = this.getAspectRatio();
			height = (width / arWidth) * arHeight;
		}

		this.size.update({
			width,
			height,
		});
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen() ? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		if (this.node?.value === null || !this.config?.allowFullscreen) {
			return;
		}

		await (this.node.value as HTMLElement).requestFullscreen();

		if (this.emit !== null) {
			this.emit('fullscreenEnter');
		}
	}

	async exitFullScreen() {
		await document.exitFullscreen();

		if (this.emit !== null) {
			this.emit('fullscreenExit');
		}
	}
}
