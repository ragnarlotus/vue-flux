import Position from './Position';
import Size from './Size';

export default class ResizeCalculator {
	realSize: Size;

	constructor(realSize: Size) {
		this.realSize = realSize;
	}

	public resizeTo(newSize: Size) {
		if (newSize.isValid() === false) {
			throw new RangeError(`Invalid size to resize`);
		}

		const adaptedSize: Size = this.getAdaptedSize(newSize);
		const adaptedPosition: Position = this.getAdaptedPosition(
			newSize,
			adaptedSize
		);

		return {
			size: adaptedSize,
			position: adaptedPosition,
		};
	}

	private getAdaptedSize(newSize: Size) {
		if (this.realSize.getAspectRatio() <= newSize.getAspectRatio()) {
			return new Size({
				width: newSize.width.value,
				height: newSize.width.value! / this.realSize.getAspectRatio(),
			});
		}

		return new Size({
			width: this.realSize.getAspectRatio() * newSize.height.value!,
			height: newSize.height.value,
		});
	}

	private getAdaptedPosition(newSize: Size, adaptedSize: Size) {
		if (this.realSize.getAspectRatio() <= adaptedSize.getAspectRatio()) {
			return new Position({
				top: (newSize.height.value! - adaptedSize.height.value!) / 2,
				left: 0,
			});
		}

		return new Position({
			top: 0,
			left: (newSize.width.value! - adaptedSize.width.value!) / 2,
		});
	}
}
