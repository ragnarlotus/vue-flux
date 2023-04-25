import { computed, ref, Ref } from 'vue';

export default class Position {
	top: Ref<null | number> = ref(null);
	left: Ref<null | number> = ref(null);
	valid: Ref<boolean> = computed<boolean>(
		() => ![this.top.value, this.left.value].includes(null)
	);

	constructor(
		{
			top = null,
			left = null,
		}: { top: null | number; left: null | number } = {
			top: null,
			left: null,
		}
	) {
		this.top.value = top;
		this.left.value = left;
	}

	reset() {
		this.top.value = null;
		this.left.value = null;
	}

	isValid() {
		return this.valid.value;
	}

	update({ top, left }: { top: number; left: number }) {
		this.top.value = top;
		this.left.value = left;
	}

	toRaw() {
		if (!this.isValid()) {
			throw new RangeError(`Invalid position`);
		}

		return {
			top: this.top.value as number,
			left: this.left.value as number,
		};
	}

	toPx() {
		if (!this.isValid()) {
			throw new RangeError(`Invalid position in pixels`);
		}

		return {
			width: this.top.value + 'px',
			height: this.left.value + 'px',
		};
	}
}
