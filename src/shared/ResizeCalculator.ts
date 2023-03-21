import Size from './Size';

export default class ResizeCalculator {
	realSize: Size;

	constructor(realSize: Size) {
		this.realSize = realSize;
	}

	public resizeTo(newSize: Size) {
		const adaptedSize: Size = this.getAdaptedSize(newSize);
		const adaptedPosition = this.getAdaptedPosition(newSize, adaptedSize);

		return {
			...adaptedSize.toRaw(),
			...adaptedPosition,
		};
	}

	private getAdaptedSize(newSize: Size) {
		if (this.realSize.getAspectRatio()! <= newSize.getAspectRatio()!) {
			return new Size({
				width: newSize.width.value,
				height: newSize.width.value! / this.realSize.getAspectRatio()!,
			});
		}

		return new Size({
			width: this.realSize.getAspectRatio()! * newSize.height.value!,
			height: newSize.height.value,
		});
	}

	private getAdaptedPosition(newSize: Size, adaptedSize: Size) {
		if (this.realSize.getAspectRatio()! <= adaptedSize.getAspectRatio()!) {
			return {
				top: (newSize.height.value! - adaptedSize.height.value!) / 2,
				left: 0,
			} as Offset;
		}

		return {
			top: 0,
			left: (newSize.width.value! - adaptedSize.width.value!) / 2,
		} as Offset;
	}
}
