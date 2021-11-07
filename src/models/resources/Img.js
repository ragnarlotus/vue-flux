import { ref, reactive } from 'vue';

export default class Img {
	status = ref(null);
	aspectRatio = ref(null);
	size = reactive({});

	constructor(src) {
		this.src = src;
		this.loader = this.load();
	}

	load() {
		if (this.status.value === 'loading')
			return this.loader;

		return new Promise((resolve, reject) => {
			if (this.status.value)
				return this.status.value === 'loaded'? resolve() : reject(this.loadError());

			this.status.value = 'loading';

			const img = new Image();

			img.onload = () => {
				this.size.width = img.naturalWidth || img.width;
				this.size.height = img.naturalHeight || img.height;

				this.aspectRatio.value = this.size.width / this.size.height;
				this.status.value = 'loaded';

				resolve();
			}

			img.onerror = () => {
				this.status.value = 'error';

				reject(this.loadError());
			}

			img.src = this.src;
		});
	}

	loadError() {
		return `Image ${this.src} could not be loaded`;
	}

	getCoverProps(viewSize) {
		if (!viewSize || this.status.value !== 'loaded')
			return undefined;

		const view = {
			size: viewSize,
			aspectRatio: viewSize.width / viewSize.height,
		};

		const cover = {
			size: this.getCoverSize(view),
		};

		cover.position = this.getCoverPosition(view, cover.size);

		return cover;
	}

	getCoverSize(view) {
		if (this.aspectRatio.value <= view.aspectRatio) {
			return {
				width: view.size.width,
				height: view.size.width / this.aspectRatio.value,
			};
		}

		return {
			width: this.aspectRatio.value * view.size.height,
			height: view.size.height,
		};
	}

	getCoverPosition(view, coverSize) {
		if (this.aspectRatio.value <= view.aspectRatio) {
			return {
				top: (view.size.height - coverSize.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (view.size.width - coverSize.width) / 2,
		};
	}

}
