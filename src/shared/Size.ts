import { ref, Ref } from 'vue';
import { aspectRatio } from './Maths';

export default class Size {
	width: Ref<number>;
	height: Ref<number>;

	constructor({ width, height }: { width: number; height: number }) {
		this.width = ref(width);
		this.height = ref(height);
	}

	getAspectRatio() {
		return aspectRatio(this);
	}

	toRaw() {
		return {
			width: this.width.value,
			height: this.height.value,
		};
	}
}
