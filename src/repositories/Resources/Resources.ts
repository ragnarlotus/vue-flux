import { Ref, ref, shallowReactive, toRaw } from 'vue';
import { Resource, ResourceWithOptions } from '../../resources';
import { Size, ResourceLoader } from '../../shared';
import { Direction, Directions } from '../../controllers/Player';
import { ResourceIndex } from './types';

export default class Resources {
	list: ResourceWithOptions[] = shallowReactive([]);
	loader: Ref<ResourceLoader | null> = ref(null);
	emit: Function;

	constructor(emit: Function) {
		this.emit = emit;
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
			throw new ReferenceError(`Resource index ${index} not found`);
		}

		return {
			index,
			rsc: this.list[index].resource,
			options: JSON.parse(JSON.stringify(this.list[index].options)),
		} as ResourceIndex;
	}

	getByOrder(order: Direction, currentIndex: number) {
		return {
			prev: () => this.getPrev(currentIndex),
			next: () => this.getNext(currentIndex),
		}[order]();
	}

	find(by: number | Direction, currentIndex?: number) {
		if (typeof by === 'number') {
			return this.getByIndex(by);
		}

		if (currentIndex === undefined) {
			throw new ReferenceError('Missing currentIndex parameter');
		}

		return this.getByOrder(by, currentIndex);
	}

	update(
		rscs: (Resource | ResourceWithOptions)[],
		numToPreload: number,
		displaySize: Size
	) {
		this.list.splice(0);

		const resources = toRaw(rscs).map((rsc) => {
			let resource = rsc;
			let options = {};

			if ('resource' in rsc) {
				resource = rsc.resource;

				if ('options' in rsc) {
					options = rsc.options;
				}
			}

			return { resource, options } as ResourceWithOptions;
		});

		const updatePromise = new Promise<void>((resolve) => {
			this.loader.value = new ResourceLoader(
				resources,
				numToPreload,
				displaySize,
				() => this.preloadStart(),
				(loaded: ResourceWithOptions[]) => this.preloadEnd(loaded, resolve),
				() => this.lazyLoadStart(),
				(loaded: ResourceWithOptions[]) => this.lazyLoadEnd(loaded)
			);
		});

		return updatePromise;
	}

	preloadStart() {
		this.emit('resources-preload-start');
	}

	preloadEnd(loaded: ResourceWithOptions[], resolve: Function) {
		loaded.forEach((rsc: ResourceWithOptions) => this.list.push(rsc));

		this.emit('resources-preload-end');

		resolve();
	}

	lazyLoadStart() {
		this.emit('resources-lazyload-start');
	}

	lazyLoadEnd(loaded: ResourceWithOptions[]) {
		loaded.forEach((rsc: ResourceWithOptions) => this.list.push(rsc));

		this.emit('resources-lazyload-end');
	}
}