export default class Img {

	constructor(src) {
		this.src = src;
		this.index = undefined;

		// null, loaded, error
		this.status = undefined;

		this.real = {
			size: undefined,
			ar: undefined,
		};

		this.final = {
			size: undefined,
			ar: undefined,
		};

		this.cover = {
			size: undefined,
			position: undefined,
		};
	}

	load() {
		return new Promise((resolve, reject) => {
			if (this.real.size)
				resolve(this.real.size);

			let img = new Image();

			img.onload = () => {
				this.status = 'loaded';

				this.real.size = {
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height,
				};

				this.real.ar = this.real.size.width / this.real.size.height;

				resolve();
			}

			img.onerror = () => {
				this.status = 'error';

				reject(`Image ${this.src} could not be loaded`);
			}

			img.src = this.src;
		});
	}

	resizeToCover(finalSize) {
		if (this.final.size && finalSize.width == this.final.size.width && finalSize.height == this.final.size.height)
			return;

		this.final.size = finalSize;
		this.final.ar = finalSize.width / finalSize.height;

		this.cover.size = this.getCoverSize();
		this.cover.position = this.getCoverPosition();
	}

	getCoverSize() {
		if (this.cover.size)
			return this.cover.size;

		if (this.real.ar <= this.final.ar) {
			return {
				width: this.final.size.width,
				height: this.final.size.width / this.real.ar,
			};
		}

		return {
			width: this.real.ar * this.final.size.height,
			height: this.final.size.height,
		};
	}

	getCoverPosition() {
		if (this.cover.position)
			return this.cover.position;

		if (this.real.ar <= this.final.ar) {
			return {
				top: (this.final.size.height - this.cover.size.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (this.final.size.width - this.cover.size.width) / 2,
		};
	}

}
