import { Transitions, TransitionIndex } from '../../repositories';

export default class PlayerTransition {
	current: TransitionIndex | null = null;
	last: TransitionIndex | null = null;

	reset() {
		this.current = null;
		this.last = null;
	}

	init(transitions: Transitions) {
		this.last = transitions.getLast();
	}
}
