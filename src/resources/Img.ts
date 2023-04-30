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
		caption: string | null = null,
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
		if (super.loader !== null) {
			return super.loader;
		}

		super.loader = new Promise<void>((resolve, reject) => {
			super.status.value = ResourceStatus.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(reject);

			img.src = super.src;
		});

		return super.loader;
	}

	onLoad(img: HTMLImageElement, resolve: Function) {
		super.realSize = new Size({
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		});

		super.status.value = ResourceStatus.loaded;

		resolve();
	}

	onError(reject: Function) {
		super.status.value = ResourceStatus.error;

		reject(super.errorMessage);
	}
}
