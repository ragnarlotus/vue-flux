import TransitionsMapper from './TransitionsMapper';
import {
	Fade,
	Kenburn,
	Swipe,
	Slide,
	TransitionWithOptions,
} from '../../transitions';

describe('repositories: TransitionsMapper', () => {
	it('turns all the transitions array as transitions with options', () => {
		const transitions = [
			Fade,
			{
				component: Kenburn,
				options: { totalDuration: 1600 },
			} as TransitionWithOptions,
			Swipe,
			{
				component: Slide,
				options: { totalDuration: 4600 },
			} as TransitionWithOptions,
		];

		const transitionsWithOptions = TransitionsMapper.withOptions(transitions);

		expect(transitionsWithOptions[0].component).toBe(Fade);
		expect(transitionsWithOptions[1].component).toBe(Kenburn);
		expect(transitionsWithOptions[1].options.totalDuration).toBe(1600);
		expect(transitionsWithOptions[2].component).toBe(Swipe);
		expect(transitionsWithOptions[3].component).toBe(Slide);
		expect(transitionsWithOptions[3].options.totalDuration).toBe(4600);
	});
});
