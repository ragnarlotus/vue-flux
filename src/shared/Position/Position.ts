import { ref, Ref } from 'vue';

export default class Position {
	top: Ref<null | number> = ref(null);
	left: Ref<null | number> = ref(null);

	constructor(
		{
			top = null,
			left = null,
		}: { top?: null | number; left?: null | number } = {
			top: null,
			left: null,
		}
	) {
		this.update({ top, left });
	}

	reset() {
		this.top.value = null;
		this.left.value = null;
	}

	isValid() {
		return ![this.top.value, this.left.value].includes(null);
	}

	update({ top, left }: { top?: null | number; left?: null | number }) {
		this.top.value = top ?? null;
		this.left.value = left ?? null;
	}

	toValue() {
		const rawPosition: {
			top?: number;
			left?: number;
		} = {
			top: undefined,
			left: undefined,
		};

		if (this.top.value !== null) {
			rawPosition.top = this.top.value;
		}

		if (this.left.value !== null) {
			rawPosition.left = this.left.value;
		}

		return rawPosition;
	}

	toPx() {
		if (!this.isValid()) {
			throw new RangeError('Invalid position in pixels');
		}

		return {
			top: this.top.value!.toString() + 'px',
			left: this.left.value!.toString() + 'px',
		};
	}
}
