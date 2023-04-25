import TransitionsRepository from '../repositories/Transitions/Transitions';
import { TransitionIndex } from '../repositories/Transitions/types';

export default class PlayerTransition {
	current: TransitionIndex | null = null;
	last: TransitionIndex | null = null;

	reset() {
		this.current = null;
		this.last = null;
	}

	init(transitions: TransitionsRepository) {
		this.last = transitions.getLast();
	}
}
