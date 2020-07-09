export default class Img {
	status;
	initIndex;
	index;
	aspectRatio;
	size;

	constructor(src, i) {
		this.src = src;
		this.initIndex = i;
	}

	load() {
		return new Promise((resolve, reject) => {
			if (this.status)
				return this.status === 'loaded'? resolve() : reject(`Image ${this.src} could not be loaded`);

			let img = new Image();

			img.onload = () => {
				this.size = {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				};

				this.aspectRatio = this.size.width / this.size.height;
				this.status = 'loaded';

				resolve();
			}

			img.onerror = () => {
				this.status = 'error';

				reject(`Image ${this.src} could not be loaded`);
			}

			img.src = this.src;
		});
	}

	getCoverProps(viewSize) {
		if (!viewSize || this.status !== 'loaded')
			return undefined;

		let view = {
			size: viewSize,
			aspectRatio: viewSize.width / viewSize.height,
		};

		let cover = {
			size: this.getCoverSize(view),
		}

		cover.position = this.getCoverPosition(view, cover.size);

		return cover;
	}

	getCoverSize(view) {
		if (this.aspectRatio <= view.aspectRatio) {
			return {
				width: view.size.width,
				height: view.size.width / this.aspectRatio,
			};
		}

		return {
			width: this.aspectRatio * view.size.height,
			height: view.size.height,
		};
	}

	getCoverPosition(view, coverSize) {
		if (this.aspectRatio <= view.aspectRatio) {
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
