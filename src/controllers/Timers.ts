interface TimersInterface {
	[index: string]: number;
}

export default class Timers {
	timers: TimersInterface = {};

	set(index: string, time: number, cb: Function) {
		this.clear(index);
		this.timers[index] = setTimeout(cb, time);
	}

	clear(index?: string): void {
		const keys = index !== undefined ? [index] : Object.keys(this.timers);

		keys.forEach((key) => {
			clearTimeout(this.timers[key]);
			delete this.timers[key];
		});
	}
}
