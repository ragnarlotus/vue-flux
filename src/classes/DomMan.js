export default class DomMan {

	constructor(parent) {
		this.parent = parent;
	}

	hasWidth() {
		return this.parent.clientWidth? true : false;
	}

	getWidth() {
		let width;

		if (this.parent.style.width)
			width = this.parent.style.width;

		else
			width = window.getComputedStyle(this.parent).width;

		return parseFloat(width);
	}

	hasHeight() {
		return this.parent.clientHeight? true : false;
	}

	getHeight() {
		let height;

		if (this.parent.style.height)
			height = this.parent.style.height;

		else
			height = window.getComputedStyle(this.parent).height;

		return parseFloat(height);
	}

	getSize() {
		return {
			width: this.getWidth(),
			height: this.getHeight()
		};
	}

}
