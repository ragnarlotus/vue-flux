import { ref, reactive, computed, toRaw } from 'vue';
import { aspectRatio } from '@/models/libs/math.js';
import FluxImage from '@/components/FluxImage.vue';

const status = {
	loading: 'loading',
	loaded: 'loaded',
	error: 'error',
};

export default class Img {
	loader;
	errorMessage;

	realSize;
	realAspectRatio;
	adaptedSize = reactive({});
	adaptedAspectRatio;
	adaptedPosition = reactive({});

	constructor(src, resizeType = 'fill') {
		this.status = ref(null);
		this.src = src;
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

	adaptToSize = (size) => {
		this.adaptedAspectRatio = aspectRatio(size);

		Object.assign(this.adaptedSize, this.getAdaptedSize(size));
		Object.assign(this.adaptedPosition, this.getAdaptedPosition(size));
	};

	getAdaptedSize(size) {
		if (this.realAspectRatio <= this.adaptedAspectRatio) {
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

	getAdaptedPosition(size) {
		if (this.realAspectRatio <= this.adaptedAspectRatio) {
			return {
				top: (size.height - this.adaptedSize.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (size.width - this.adaptedSize.width) / 2,
		};
	}
}
