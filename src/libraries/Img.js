export default class Img {

	construnctor(img) {
		this.src = img.src || img;

		// null, loaded, error
		this.status = null;

		this.real = {
			size: img.size || null,
			ar: null,
		};

		this.final = {
			size: null,
			position: null,
			ar: null,
		};

		this.cover = {
			size: null,
			position: null,
		};
	}

	getSize() {
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

				resolve(this.size);
			}

			img.onerror = () => {
				this.status = 'error';

				reject(`Image ${this.src} could not be loaded`);
			}

			img.src = this.src;
		});
	}

	resizeToCover(finalSize) {
		if (finalSize.width == this.final.size.width && finalSize.height == this.final.size.height)
			return;

		this.final.size = finalSize;
		this.final.ar = finalSize.width / finalSize.height;

		this.coverSize = this.getCoverSize();
		this.coverPosition = this.getCoverPosition();
	}

	async getCoverSize() {
		if (this.cover.size)
			return this.cover.size;

		if (this.real.ar >= this.final.ar) {
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

	async getCoverPosition() {
		if (this.cover.position)
			return this.cover.position;

		let realSize = await this.getSize();

		if (this.real.ar >= this.final.ar) {
			return {
				top: (this.final.size.height - realSize.height) / 2,
				left: 0,
			};
		}

		return {
			top: 0,
			left: (this.final.size.width - realSize.width) / 2,
		};
	}

}
