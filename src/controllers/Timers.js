export default class TimersController {
	constructor() {
		this.timers = {};
	}

	set(timer, time, cb) {
		this.clear(timer);
		this.timers[timer] = setTimeout(cb, time);
	}

	clear(timer) {
		let timers = timer? [ timer ] : Object.keys(this.timers);

		timers.forEach(timer => {
			clearTimeout(this.timers[timer]);
			this.timers[timer] = undefined;
		});
	}
}
