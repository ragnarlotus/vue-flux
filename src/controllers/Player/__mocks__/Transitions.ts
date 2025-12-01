import type { TransitionIndex } from '../../../repositories';
import { vi } from 'vitest';

export default class PlayerTransition {
	current: TransitionIndex | null = null;
	last: TransitionIndex | null = null;

	reset = vi.fn();
	init = vi.fn();
	setCurrentFinished = vi.fn();
}
