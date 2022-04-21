export default class TimersController {
	timers = {};

	set(timer, time, cb) {
		this.clear(timer);
		this.timers[timer] = setTimeout(cb, time);
	}

	clear(timer) {
		const timers = timer? [ timer ] : Object.keys(this.timers);

		timers.forEach(timer => {
			clearTimeout(this.timers[timer]);
			this.timers[timer] = null;
		});
	}
}
