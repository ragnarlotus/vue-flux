export default class Timers {
	timers: {
		[index: string]: ReturnType<typeof setTimeout>;
	} = {};

	set(index: string, time: number, cb: () => void) {
		this.clear(index);
		this.timers[index] = setTimeout(cb, time);
	}

	clear(index?: string) {
		const keys = index !== undefined ? [index] : Object.keys(this.timers);

		keys.forEach((key) => {
			clearTimeout(this.timers[key]);
			delete this.timers[key];
		});
	}
}
