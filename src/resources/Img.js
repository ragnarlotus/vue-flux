import { ref, reactive, toRaw } from 'vue';
import { aspectRatio } from '@/libs/Maths.js';
import FluxImage from '@/components/FluxImage.vue';

const status = {
	loading: 'loading',
	loaded: 'loaded',
	error: 'error',
};

export default class Img {
	loader;
	errorMessage;
	status = ref(null);

	realSize;
	realAspectRatio;
	displaySize = reactive({});
	adaptedSize = reactive({});
	adaptedAspectRatio;
	adaptedPosition = reactive({});

	constructor(src, caption = null, resizeType = 'fill') {
		this.src = src;
		this.caption = caption;
		this.resizeType = resizeType; // fill | fit

		this.display = {
			component: FluxImage,
			props: {},
		};

		this.transition = {
			component: FluxImage,
			props: {},
		};
	}

	isLoading = () => this.status.value === status.loading;

	isLoaded = () => this.status.value === status.loaded;

	isError = () => this.status.value === status.error;

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

			this.status.value = status.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(reject);

			img.src = this.src;
		});

		return this.loader;
	}

	onLoad(img, resolve) {
		this.realSize = {
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		};

		this.realAspectRatio = aspectRatio(this.realSize);
		this.status.value = status.loaded;

		resolve();
	}

	onError(reject) {
		this.status.value = status.error;
		this.errorMessage = `Image ${this.src} could not be loaded`;

		reject(this.errorMessage);
	}

	adaptToSize(newSize) {
		Object.assign(this.displaySize, newSize);
		this.adaptedAspectRatio = aspectRatio(newSize);

		Object.assign(
			this.adaptedSize,
			this.getAdaptedSize(newSize, this.adaptedAspectRatio)
		);

		Object.assign(
			this.adaptedPosition,
			this.getAdaptedPosition(
				newSize,
				this.adaptedSize,
				this.adaptedAspectRatio
			)
		);
	}

	getAdaptedSize(size, adaptedAspectRatio) {
		if (this.realAspectRatio <= adaptedAspectRatio) {
			return {
				width: size.width,
				height: size.width / this.realAspectRatio,
			};
		}

		return {
			width: this.realAspectRatio * size.height,
			height: size.height,
		};
	}

	getAdaptedPosition(newSize, adaptedSize, adaptedAspectRatio) {
		if (this.realAspectRatio <= adaptedAspectRatio) {
			return {
				top: (newSize.height - adaptedSize.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (newSize.width - adaptedSize.width) / 2,
		};
	}

	getAdaptedProps(newSize) {
		if (
			newSize.width === this.displaySize.width &&
			newSize.height === this.displaySize.height
		) {
			return {
				...toRaw(this.adaptedSize),
				...toRaw(this.adaptedPosition),
			};
		}

		const adaptedAspectRatio = aspectRatio(newSize);
		const adaptedSize = this.getAdaptedSize(newSize, adaptedAspectRatio);
		const adaptedPosition = this.getAdaptedPosition(
			newSize,
			adaptedSize,
			adaptedAspectRatio
		);

		return {
			...adaptedSize,
			...adaptedPosition,
		};
	}
}
