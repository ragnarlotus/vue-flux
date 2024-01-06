import { Component } from 'vue';
import { TransitionComponent, TransitionWithOptions } from '../../transitions';

export default class TransitionsMapper {
	static withOptions(transitions: (Component | TransitionWithOptions)[]) {
		return transitions.map((transition) => {
			let component = transition;
			let options = {};

			if ('component' in transition) {
				component = transition.component as TransitionComponent;

				if ('options' in transition) {
					options = transition.options;
				}
			}

			return { component, options } as TransitionWithOptions;
		});
	}
}
