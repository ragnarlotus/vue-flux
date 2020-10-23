import FluxContentBase from './FluxContentBase';

export default class FluxContentImage extends FluxContentBase {

	constructor(src) {
		super();

		this.content.src = src;
	}

	load() {
		return new Promise((resolve, reject) => {
			let img = new Image();

			img.onload = this.onLoadSuccess(resolve, img);
			img.onerror = this.onLoadError(reject);
			img.src = this.content.src;
		});
	}

	onLoadSuccess(resolve, img) {
		this.content.size = {
			width: img.naturalWidth || img.width,
			height: img.naturalHeight || img.height,
		};

		resolve();
	}

	onLoadError(reject) {
		reject(`Image ${this.content.src} could not be loaded`);
	}

}
