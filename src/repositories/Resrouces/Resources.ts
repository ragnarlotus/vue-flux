import { shallowReactive, toRaw } from 'vue';
import ResourceLoader from '../../shared/ResourceLoader';
import Resource from '../../resources/Resource';
import Player from '../../controllers/Player';
import { Size } from '../../shared';
import { Direction, Directions } from '../../types';
import { ResourceIndex } from './types';

export default class Resources {
	player: Player;
	list: Resource[] = shallowReactive([]);
	loader?: ResourceLoader;

	constructor(player: Player) {
		this.player = player;
	}

	private getPrev(currentIndex: number) {
		return this.getByIndex(
			currentIndex > 0 ? currentIndex - 1 : this.list.length - 1
		);
	}

	private getNext(currentIndex: number) {
		return this.getByIndex(
			currentIndex === this.list.length - 1 ? 0 : currentIndex + 1
		);
	}

	getFirst() {
		return this.getByIndex(0);
	}

	getLast() {
		return this.getByOrder(Directions.prev, 0);
	}

	getByIndex(index: number) {
		if (this.list[index] === undefined) {
			throw new ReferenceError(`Resource ${index} not found`);
		}

		return {
			index,
			rsc: this.list[index],
		} as ResourceIndex;
	}

	getByOrder(order: Direction, currentIndex: number) {
		return {
			prev: () => this.getPrev(currentIndex),
			next: () => this.getNext(currentIndex),
		}[order]();
	}

	update(rscs: Resource[], numToPreload: number, displaySize: Size) {
		this.list.splice(0);

		const resources = [...toRaw(rscs)];

		this.loader = new ResourceLoader(
			resources,
			numToPreload,
			displaySize,
			(loaded: Resource[]) => this.preloadFinished(loaded),
			(loaded: Resource[]) => this.lazyloadFinished(loaded)
		);
	}

	preloadFinished(loaded: Resource[]) {
		loaded.forEach((rsc: Resource) => this.list.push(rsc));
	}

	lazyloadFinished(loaded: Resource[]) {
		loaded.forEach((rsc: Resource) => this.list.push(rsc));
	}
}
