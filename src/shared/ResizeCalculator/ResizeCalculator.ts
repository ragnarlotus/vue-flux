import { ResizeType, ResizeTypes } from '../../resources';
import { Size, Position } from '../';

/* eslint-disable no-unused-vars */
export enum Orientations {
	landscape = 'landscape',
	portrait = 'portrait',
}
/* eslint-enable no-unused-vars */

const getOrientation = (aspectRatio: number) =>
	aspectRatio >= 1 ? Orientations.landscape : Orientations.portrait;

type Orientation = keyof typeof Orientations;

export default class ResizeCalculator {
	realSize: Size;
	realAspectRatio: number;
	realOrientation: Orientation;

	constructor(realSize: Size) {
		if (realSize.isValid() === false) {
			throw new RangeError('Invalid real size');
		}

		this.realSize = realSize;
		this.realAspectRatio = this.realSize.getAspectRatio();
		this.realOrientation = getOrientation(this.realAspectRatio);
	}

	public resizeTo(resizeSize: Size, resizeType: ResizeType) {
		if (resizeSize.isValid() === false) {
			throw new RangeError('Invalid size to resize');
		}

		const resizeAspectRatio = resizeSize.getAspectRatio();
		const resizeOrientation = getOrientation(resizeAspectRatio);

		const adaptedSize: Size = this.getAdaptedSize(
			resizeSize,
			resizeAspectRatio,
			resizeOrientation,
			resizeType
		);

		const adaptedPosition: Position = this.getAdaptedPosition(
			resizeSize,
			resizeAspectRatio,
			adaptedSize,
			resizeType
		);

		return {
			size: adaptedSize,
			position: adaptedPosition,
		};
	}

	private getAdaptedSize(
		resizeSize: Size,
		resizeAspectRatio: number,
		resizeOrientation: Orientation,
		resizeType: ResizeType
	) {
		if (
			resizeOrientation === Orientations.landscape &&
			this.realOrientation === Orientations.portrait &&
			resizeType === ResizeTypes.fill
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		if (
			resizeOrientation === Orientations.landscape &&
			this.realOrientation === Orientations.landscape &&
			resizeAspectRatio >= this.realAspectRatio &&
			resizeType === ResizeTypes.fill
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		if (
			resizeOrientation === Orientations.landscape &&
			this.realOrientation === Orientations.landscape &&
			resizeAspectRatio < this.realAspectRatio &&
			resizeType === ResizeTypes.fit
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		if (
			resizeOrientation === Orientations.portrait &&
			this.realOrientation === Orientations.landscape &&
			resizeType === ResizeTypes.fit
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		if (
			resizeOrientation === Orientations.portrait &&
			this.realOrientation === Orientations.portrait &&
			resizeAspectRatio > this.realAspectRatio &&
			resizeType === ResizeTypes.fill
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		if (
			resizeOrientation === Orientations.portrait &&
			this.realOrientation === Orientations.portrait &&
			resizeAspectRatio <= this.realAspectRatio &&
			resizeType === ResizeTypes.fit
		) {
			return this.getAdaptedSizeByWith(resizeSize);
		}

		return this.getAdaptedSizeByHeight(resizeSize);
	}

	private getAdaptedSizeByWith(resizeSize: Size) {
		return new Size({
			width: resizeSize.width.value,
			height: resizeSize.width.value! / this.realAspectRatio,
		});
	}

	private getAdaptedSizeByHeight(resizeSize: Size) {
		return new Size({
			width: this.realAspectRatio * resizeSize.height.value!,
			height: resizeSize.height.value,
		});
	}

	private getAdaptedPosition(
		resizeSize: Size,
		resizeAspectRatio: number,
		adaptedSize: Size,
		resizeType: ResizeType
	) {
		if (
			this.realAspectRatio <= resizeAspectRatio &&
			resizeType === ResizeTypes.fill
		) {
			return this.getAdaptedPositionVertically(resizeSize, adaptedSize);
		}

		if (
			this.realAspectRatio > resizeAspectRatio &&
			resizeType === ResizeTypes.fit
		) {
			return this.getAdaptedPositionVertically(resizeSize, adaptedSize);
		}

		return this.getAdaptedPositionHorizontally(resizeSize, adaptedSize);
	}

	getAdaptedPositionVertically(resizeSize: Size, adaptedSize: Size) {
		return new Position({
			top: (resizeSize.height.value! - adaptedSize.height.value!) / 2,
			left: 0,
		});
	}

	getAdaptedPositionHorizontally(resizeSize: Size, adaptedSize: Size) {
		return new Position({
			top: 0,
			left: (resizeSize.width.value! - adaptedSize.width.value!) / 2,
		});
	}
}
