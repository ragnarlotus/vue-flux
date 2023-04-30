import { Component, shallowReactive, toRaw } from 'vue';
import Player from '../../controllers/Player';
import { Directions, Direction } from '../../types';
import { TransitionIndex } from './types';
import { TransitionWithOptions } from '../../components/VueFlux/types';

export default class Transitions {
	player: Player;
	list: TransitionWithOptions[] = shallowReactive([]);

	constructor(player: Player) {
		this.player = player;
	}

	private getPrev(lastIndex: number) {
		return this.getByIndex(
			lastIndex > 0 ? lastIndex - 1 : this.list.length - 1
		);
	}

	private getNext(lastIndex: number) {
		return this.getByIndex(
			lastIndex === this.list.length - 1 ? 0 : lastIndex + 1
		);
	}

	getFirst() {
		return this.getByIndex(0);
	}

	getLast() {
		return this.getByOrder(Directions.prev, 0);
	}

	getByIndex(index: number) {
		return {
			index: index,
			...this.list[index],
		} as TransitionIndex;
	}

	getByOrder(direction: Direction, lastIndex: number) {
		return {
			prev: () => this.getPrev(lastIndex),
			next: () => this.getNext(lastIndex),
		}[direction]();
	}

	update(transitions: Object[]) {
		this.list.splice(0);

		toRaw(transitions).forEach((transition) => {
			let component = transition;
			let options = {};

			if ('component' in transition) {
				component = transition.component as Component;

				if ('options' in transition) {
					options = transition.options as object;
				}
			}

			this.list.push({ component, options } as TransitionWithOptions);
		});
	}
}
