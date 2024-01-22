import { ref, Ref } from 'vue';
import { Maths } from '../';

export default class Size {
	width: Ref<null | number> = ref(null);
	height: Ref<null | number> = ref(null);

	constructor(
		{
			width = null,
			height = null,
		}: {
			width?: null | number;
			height?: null | number;
		} = { width: null, height: null }
	) {
		this.update({ width, height });
	}

	reset() {
		this.width.value = null;
		this.height.value = null;
	}

	isValid() {
		return ![this.width.value, this.height.value].includes(null);
	}

	update({
		width,
		height,
	}: {
		width?: null | number;
		height?: null | number;
	}) {
		this.width.value = width ?? null;
		this.height.value = height ?? null;
	}

	getAspectRatio() {
		if (!this.isValid()) {
			throw new RangeError('Could not get aspect ratio due to invalid size');
		}

		return Maths.aspectRatio(
			this.toValue() as { width: number; height: number }
		);
	}

	clone() {
		return new Size(this.toValue());
	}

	equals(otherSize: Size) {
		if (this.width.value !== otherSize.width.value) {
			return false;
		}

		if (this.height.value !== otherSize.height.value) {
			return false;
		}

		return true;
	}

	toValue() {
		const rawSize: {
			width?: number;
			height?: number;
		} = {};

		if (this.width.value !== null) {
			rawSize.width = this.width.value;
		}

		if (this.height.value !== null) {
			rawSize.height = this.height.value;
		}

		return rawSize;
	}

	toPx() {
		if (!this.isValid()) {
			throw new RangeError('Invalid size in pixels');
		}

		return {
			width: this.width.value!.toString() + 'px',
			height: this.height.value!.toString() + 'px',
		};
	}
}
