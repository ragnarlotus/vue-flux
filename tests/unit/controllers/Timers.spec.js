import TimersController from '@/controllers/Timers';

describe('TimersController', () => {
	let ctrl;

	beforeEach(() => {
		ctrl = new TimersController;
	});

	test('clear timer if exists on set', done => {
		ctrl.clear = jest.fn();

		ctrl.set('timer', 1000, () => {
			expect(ctrl.clear).toHaveBeenCalled();
			done();
		});
	});

	test('sets timer', () => {
		expect(ctrl.timers['timer']).toBe(undefined);

		ctrl.set('timer', 1000, () => {});

		expect(ctrl.timers['timer']).toBeDefined();
	});

	test('clear defined timer', () => {
		const timer = 'timer';

		expect(ctrl.timers[timer]).toBe(undefined);

		ctrl.set(timer, 1000, () => {});
		ctrl.clear('timer');

		expect(ctrl.timers[timer]).toBe(undefined);
	});

	test('clear all timers', () => {
		const timers = ['timer1', 'timer2', 'timer3'];

		for (const timer of timers)
			ctrl.set(timer, 1000, () => {});

		ctrl.clear();

		for (const timer of timers)
			expect(ctrl.timers[timer]).toBe(undefined);
	});

});
