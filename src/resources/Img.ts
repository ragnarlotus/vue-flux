import { aspectRatio } from '../libs/Maths.js';
import FluxImage from '../components/FluxImage.vue';
import Resource from './Resource';
import { ResourceStatus } from '../types';

export default class Img extends Resource {
	constructor(
		src: string,
		caption: string | null = null,
		resizeType: 'fill' | 'fit' = 'fill'
	) {
		super(src, caption, resizeType);

		this.errorMessage = `Image ${src} could not be loaded`;

		this.display = {
			component: FluxImage,
			props: {},
		};

		this.transition = {
			component: FluxImage,
			props: {},
		};
	}

	load() {
		if (this.isLoading()) {
			return this.loader;
		}

		this.loader = new Promise((resolve, reject) => {
			if (this.isLoaded()) {
				return resolve();
			}

			if (this.isError()) {
				return reject(this.errorMessage);
			}

			this.status.value = ResourceStatus.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(reject);

			img.src = this.src;
		});

		return this.loader;
	}

	onLoad(img: HTMLImageElement, resolve: Function) {
		this.realSize = {
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		};

		this.realAspectRatio = aspectRatio(this.realSize);
		this.status.value = ResourceStatus.loaded;

		resolve();
	}

	onError(reject: Function) {
		this.status.value = ResourceStatus.error;

		reject(this.errorMessage);
	}
}
