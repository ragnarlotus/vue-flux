import { ref, reactive, computed } from 'vue';

const status = {
	loading: 'loading',
	loaded: 'loaded',
	error: 'error',
};

export default class Img {
	status = ref(null);
	errorMessage;

	size;
	aspectRatio;

	constructor(src, resizeType = 'fill') {
		this.src = src;
		this.resizeType = resizeType; // fill | fitsize
		this.loader = this.load();
	}

	isLoading = () => this.status.value === status.loading;

	isLoaded = () => this.status.value === status.loaded;

	isError = () => this.status.value === status.error;

	load() {
		if (this.isLoading())
			return this.loader;

		return new Promise((resolve, reject) => {
			if (this.isLoaded())
				return resolve();

			if (this.isError())
				return reject(this.errorMessage);

			this.status.value = status.loading;

			const img = new Image();

			img.onload = () => this.onLoad(img, resolve);
			img.onerror = () => this.onError(img, reject);

			img.src = this.src;
		});
	}

	onLoad(img, resolve) {
		this.size = {
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		};

		this.aspectRatio = this.size.width / this.size.height;
		this.status.value = status.loaded;

		resolve();
	}

	onError(img, reject) {
		this.status.value = status.error;
		this.errorMessage = `Image ${this.src} could not be loaded`;

		reject(this.errorMessage);
	}

	adaptToSize = reactive({});

	adaptedStyle = computed(() => {
		const adaptedAspectRatio = this.adaptToSize.width / this.adaptToSize.height;

		const adaptedSize = this.getAdaptedSize(adaptedAspectRatio);
		const adaptedPosition = this.getAdaptedPosition(adaptedAspectRatio, adaptedSize);

		return {
			...adaptedSize,
			...adaptedPosition,
		};
	});

	getAdaptedSize(adaptedAspectRatio) {
		if (this.aspectRatio <= adaptedAspectRatio) {
			return {
				width: this.adaptToSize.width,
				height: this.adaptToSize.width / this.aspectRatio,
			};
		}

		return {
			width: this.aspectRatio * this.adaptToSize.height,
			height: this.adaptToSize.height,
		};
	}

	getAdaptedPosition(adaptedAspectRatio, adaptedSize) {
		if (this.aspectRatio <= adaptedAspectRatio) {
			return {
				top: (this.adaptToSize.height - adaptedSize.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (this.adaptToSize.width - adaptedSize.width) / 2,
		};
	}

}
