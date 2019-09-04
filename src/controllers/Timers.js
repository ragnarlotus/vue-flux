export default class TimersController {
	constructor() {
		this.timers = {};
	}

	set(timer, time, cb) {
		this.timers[timer] = setTimeout(cb, time);
	}

	clear(timer) {
		let timers = timer? [ timer ] : Object.keys(this.timers);

		timers.forEach(timer => clearTimeout(this.timers[timer]));
	}
}
