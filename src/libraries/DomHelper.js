export default class DomHelper {

	constructor(node) {
		this.node = node;
		this.parent = node.parentNode;
	}

	get size() {
		return {
			width: this.getWidth(),
			height: this.getHeight(),
		};
	}

	static sizeFrom(node) {
		return (new DomHelper(node)).size;
	}

	hasWidth() {
		return this.node.clientWidth? true : false;
	};

	getWidth() {
		let width;

		if (this.node.style.width)
			width = this.node.style.width;

		else
			width = window.getComputedStyle(this.node).width;

		return parseFloat(width);
	}

	hasHeight() {
		return this.node.clientHeight? true : false;
	}

	getHeight() {
		let height;

		if (this.node.style.height)
			height = this.node.style.height;

		else
			height = window.getComputedStyle(this.node).height;

		return parseFloat(height);
	}

}
