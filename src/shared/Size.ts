import { computed, ref, Ref } from 'vue';
import { aspectRatio } from './Maths';

export default class Size {
	width: Ref<null | number> = ref(null);
	height: Ref<null | number> = ref(null);
	valid: Ref<boolean> = computed<boolean>(
		() => ![this.width.value, this.height.value].includes(null)
	);

	constructor(
		{
			width = null,
			height = null,
		}: {
			width: null | number;
			height: null | number;
		} = { width: null, height: null }
	) {
		this.width.value = width;
		this.height.value = height;
	}

	reset() {
		this.width.value = null;
		this.height.value = null;
	}

	isValid() {
		return this.valid.value;
	}

	update({ width, height }: { width: number; height: number }) {
		this.width.value = width;
		this.height.value = height;
	}

	getAspectRatio() {
		if (!this.isValid()) {
			throw new RangeError(`Could not get aspect ratio due to invalid size`);
		}

		return aspectRatio(this);
	}

	toRaw() {
		if (!this.isValid()) {
			throw new RangeError(`Invalid size`);
		}

		return {
			width: this.width.value as number,
			height: this.height.value as number,
		};
	}

	toPx() {
		if (!this.isValid()) {
			throw new RangeError(`Invalid size in pixels`);
		}

		return {
			width: this.width.value + 'px',
			height: this.height.value + 'px',
		};
	}
}
