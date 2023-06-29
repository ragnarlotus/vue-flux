import { nextTick, Ref } from 'vue';
import { Resources } from '../repositories';
import Size from '../shared/Size';
import Resource from '../resources/Resource';
import { Config } from '../components/VueFlux/types';

export default class Display {
	config: Config;
	resources: Resources;
	node: Ref<null | HTMLElement>;
	size: Size = new Size();

	constructor(
		config: Config,
		resources: Resources,
		node: Ref<null | HTMLElement>
	) {
		this.config = config;
		this.resources = resources;
		this.node = node;
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
		this.size.reset();

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

		this.size.update({
			width,
			height,
		});

		this.resources.list.forEach((rsc: Resource) =>
			rsc.cacheToSize(this.size)
		);
	}

	inFullScreen = () => !!document.fullscreenElement;

	toggleFullScreen() {
		this.inFullScreen() ? this.exitFullScreen() : this.enterFullScreen();
	}

	async enterFullScreen() {
		if (
			!this.config.allowFullscreen ||
			this.node === null ||
			this.node.value === null
		) {
			return;
		}

		this.node.value.requestFullscreen();
	}

	async exitFullScreen() {
		document.exitFullscreen();
	}
}
