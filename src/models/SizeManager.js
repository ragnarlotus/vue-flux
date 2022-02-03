import { ref, computed } from 'vue';

export default class SizeManager {
	defaultAspectRatio = ref(16/9);
	width = ref('auto');
	height = ref('auto');

	constructor(props) {
		this.width.value = parseFloat(size.width);
		this.height.value = parseFloat(size.height);
	}

	static fromNode(node) {
		if (node instanceof Element === false) {
			throw new Error(node +' is not an HTML node element');
		}

		const { width, height } = getComputedStyle(node);

		return new SizeManager({width, height});
	}

	aspectRatio = computed(() => {
		if (!this.width.value || !this.height.value)
			return undefined;

		return this.width.value / this.height.value;
	});
}
