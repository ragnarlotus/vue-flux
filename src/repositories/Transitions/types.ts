import type { Component } from 'vue';
import type { Direction } from '../../controllers/Player';

export interface TransitionIndex {
	index: number;
	component: Component;
	options: {
		direction?: Direction;
	};
}
