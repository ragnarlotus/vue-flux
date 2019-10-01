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

	static px(size) {
		if (!size)
			return undefined;

		return parseFloat(size) +'px';
	}

	hasWidth() {
		return !!this.node.clientWidth;
	}

	getWidth() {
		let width = this.node.style.width;

		if (!width || width === 'auto')
			width = getComputedStyle(this.node).width;

		return parseFloat(width);
	}

	hasHeight() {
		return !!this.node.clientHeight;
	}

	getHeight() {
		let height = this.node.style.height;

		if (!height || height === 'auto')
			height = getComputedStyle(this.node).height;

		return parseFloat(height);
	}

}
