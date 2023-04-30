import { Component } from 'vue';
import { Direction } from '../../types';

export interface TransitionIndex {
	index: number;
	component: Component;
	options: {
		direction?: Direction;
	};
}
