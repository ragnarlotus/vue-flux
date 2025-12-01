import { type Component, shallowReactive } from 'vue';
import { Directions, type Direction } from '../../controllers/Player';
import type { TransitionIndex } from './types';
import type { TransitionWithOptions } from '../../transitions/types';
import TransitionsMapper from './TransitionsMapper';

export default class Transitions {
	list: TransitionWithOptions[] = shallowReactive([]);

	private getPrev(lastIndex: number) {
		return this.getByIndex(lastIndex > 0 ? lastIndex - 1 : this.list.length - 1);
	}

	private getNext(lastIndex: number) {
		return this.getByIndex(lastIndex === this.list.length - 1 ? 0 : lastIndex + 1);
	}

	getFirst() {
		return this.getByIndex(0);
	}

	getLast() {
		return this.getByOrder(Directions.prev, 0);
	}

	getByIndex(index: number) {
		const item = this.list[index];

		if (!item) {
			throw new Error(`Transition index ${index} out of range`);
		}

		return {
			index,
			component: item.component,
			options: JSON.parse(JSON.stringify(item.options)),
		} as TransitionIndex;
	}

	getByOrder(direction: Direction, lastIndex: number) {
		return {
			prev: () => this.getPrev(lastIndex),
			next: () => this.getNext(lastIndex),
		}[direction]();
	}

	update(transitions: (Component | TransitionWithOptions)[]) {
		this.list.splice(0);

		const transitionsWithOptions = TransitionsMapper.withOptions(transitions);

		this.list.push(...transitionsWithOptions);
	}
}
