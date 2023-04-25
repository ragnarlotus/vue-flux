import { Component } from 'vue';
import { OrderParameter } from '../../types';

export interface TransitionIndex {
	index: number;
	component: Component;
	options: {
		direction?: OrderParameter;
	};
}
