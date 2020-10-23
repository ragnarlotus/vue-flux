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
		let width = getComputedStyle(this.node).width;

		return parseFloat(width);
	}

	getHeight() {
		let height = getComputedStyle(this.node).height;

		return parseFloat(height);
	}

}
