import { ref, computed, nextTick, Ref } from 'vue';
import { VueFluxConfig } from '../types';
import { ResourceRepository } from '../repositories';
import Size from '../shared/Size';
import Resource from '../resources/Resource';

export default class Display {
	config: VueFluxConfig;
	resources: ResourceRepository;
	node: Ref<HTMLElement>;
	ready: Ref<boolean> = ref(false);
	size: Size | null = null;

	constructor(
		config: VueFluxConfig,
		resources: ResourceRepository,
		node: Ref<HTMLElement>
	) {
		this.config = config;
		this.resources = resources;
		this.node = node;

		this.ready = computed(() => {
			return this.size !== null;
		});
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
		this.size = null;

		await nextTick();

		if (this.node.value === null) {
			return;
		}

		const computedStyle = getComputedStyle(this.node.value);
		let width = parseFloat(computedStyle.width);
		let height = parseFloat(computedStyle.height);

		if (['0px', 'auto', null].includes(computedStyle.height)) {
			const [arWidth, arHeight] = this.config.aspectRatio.split(':');
			height = (width / parseFloat(arWidth)) * parseFloat(arHeight);
		}

		this.size = new Size({
			width,
			height,
		});

		this.resources.list.forEach((rsc: Resource) =>
			rsc.adaptToSize(this.size!)
		);
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen() ? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		if (!this.config.allowFullscreen || this.node.value === null) {
			return;
		}

		this.node.value.requestFullscreen();
	}

	async exitFullScreen() {
		document.exitFullscreen();
	}
}
