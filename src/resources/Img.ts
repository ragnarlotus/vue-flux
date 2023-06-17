import FluxImage from '../components/FluxImage/FluxImage.vue';
import Resource from './Resource';
import Size from '../shared/Size';
import {
	DisplayParamenter,
	ResizeType,
	ResourceStatus,
	TransitionParameter,
} from './types';

export default class Img extends Resource {
	constructor(
		src: string,
		caption: string = '',
		resizeType: ResizeType = 'fill'
	) {
		const display: DisplayParamenter = {
			component: FluxImage,
			props: {},
		};

		const transition: TransitionParameter = {
			component: FluxImage,
			props: {},
		};

		const errorMessage = `Image ${src} could not be loaded`;

		super(src, caption, resizeType, display, transition, errorMessage);
	}

	load() {
		if (this.loader !== null) {
			return this.loader;
		}

		this.loader = new Promise<void>((resolve, reject) => {
			this.status.value = ResourceStatus.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(reject);

			img.src = this.src;
		});

		return this.loader;
	}

	onLoad(img: HTMLImageElement, resolve: Function) {
		this.realSize = new Size({
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		});

		this.status.value = ResourceStatus.loaded;

		resolve();
	}

	onError(reject: Function) {
		this.status.value = ResourceStatus.error;

		reject(this.errorMessage);
	}
}
