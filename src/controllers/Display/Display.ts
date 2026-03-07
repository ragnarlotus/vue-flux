import { nextTick, type Ref, type Component } from 'vue';
import { Size } from '../../shared';
import type { VueFluxConfig, VueFluxEmits } from '../../components';
import Timers from '../Timers/Timers';

export default class Display {
	node: Ref<null | HTMLElement | Component>;
	config: VueFluxConfig | null;
	emit: null | VueFluxEmits = null;
	size: Size = new Size();
	readonly timers: Timers;

	private resizeTimer: ReturnType<typeof setTimeout> | null = null;
	private readonly resizeDebounceDelay = 150;

	constructor(
		node: Ref<null | HTMLElement | Component>,
		config: VueFluxConfig | null = null,
		timers: Timers = new Timers(),
		emit: null | VueFluxEmits = null,
	) {
		this.node = node;
		this.config = config;
		this.timers = timers;
		this.emit = emit;
	}

	static async getSize(node: Ref<null | HTMLElement | Component>) {
		const display = new Display(node);
		await display.updateSize();

		return display.size;
	}

	private readonly onResize = () => {
		this.timers.clear('displayResize');

		this.timers.set('displayResize', this.resizeDebounceDelay, () => {
			this.updateSize();
		});
	};

	addResizeListener() {
		window.addEventListener('resize', this.onResize, {
			passive: true,
		});

		void this.updateSize();
	}

	removeResizeListener() {
		window.removeEventListener('resize', this.onResize);

		if (this.resizeTimer !== null) {
			clearTimeout(this.resizeTimer);
			this.resizeTimer = null;
		}
	}

	getAspectRatio() {
		if (this.config !== null) {
			const [width, height] = this.config.aspectRatio.split(':');

			return [parseFloat(width ?? ''), parseFloat(height ?? '')];
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

			if (arWidth === undefined || arHeight === undefined) {
				return;
			}

			height = (width / arWidth) * arHeight;
		}

		this.size.update({
			width,
			height,
		});
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
