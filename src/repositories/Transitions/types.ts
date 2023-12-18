import { Component } from 'vue';
import { Direction } from '../../controllers/Player';

export interface TransitionIndex {
	index: number;
	component: Component;
	options: {
		direction?: Direction;
	};
}
