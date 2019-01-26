export default class TimersManager {

	constructor() {
		this.image = undefined;
		this.transition = undefined;
		this.mouseOver = undefined;
	}

	clear(timer) {
		if (timer === undefined || timer === 'image')
			clearTimeout(this.image);

		if (timer === undefined || timer === 'transition')
			clearTimeout(this.transition);

		if (timer === undefined || timer === 'mouse-over')
			clearTimeout(this.mouseOver);
	}

}
