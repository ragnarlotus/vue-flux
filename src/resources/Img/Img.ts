import { FluxImage } from '../../components';
import { Resource, Statuses, ResizeTypes } from '../';
import { Size } from '../../shared';
import { DisplayParameter, ResizeType, TransitionParameter } from '../types';

export default class Img extends Resource {
	constructor(
		src: string,
		caption: string = '',
		resizeType: ResizeType = ResizeTypes.fill,
		backgroundColor: null | string = null
	) {
		const display: DisplayParameter = {
			component: FluxImage,
			props: {},
		};

		const transition: TransitionParameter = {
			component: FluxImage,
			props: {},
		};

		const errorMessage = `Image ${src} could not be loaded`;

		super(
			src,
			caption,
			resizeType,
			backgroundColor,
			display,
			transition,
			errorMessage
		);
	}

	load() {
		if (this.loader !== null) {
			return this.loader;
		}

		this.loader = new Promise<void>((resolve, reject) => {
			this.status.value = Statuses.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(reject);

			img.src = this.src;
		});

		return this.loader;
	}

	onLoad(img: HTMLImageElement, resolve: () => void) {
		this.realSize = new Size({
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		});

		this.status.value = Statuses.loaded;

		resolve();
	}

	onError(reject: (message: string) => void) {
		this.status.value = Statuses.error;

		reject(this.errorMessage);
	}
}
