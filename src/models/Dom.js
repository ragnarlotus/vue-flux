export default class Dom {

	constructor(node) {
		this.node = node;
	}

	get size() {
		return {
			width: this.getWidth(),
			height: this.getHeight(),
		};
	}

	static sizeFrom(node) {
		return (new Dom(node)).size;
	}

	getWidth() {
		const width = getComputedStyle(this.node).width;

		return parseFloat(width);
	}

	getHeight() {
		const height = getComputedStyle(this.node).height;

		return parseFloat(height);
	}

}
