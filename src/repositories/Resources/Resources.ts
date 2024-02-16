import { Ref, ref, shallowReactive } from 'vue';
import { Resource, ResourceWithOptions } from '../../resources';
import { Size, ResourceLoader } from '../../shared';
import { Direction, Directions } from '../../controllers/Player';
import { ResourceIndex } from './types';
import ResourcesMapper from './ResourcesMapper';
import { VueFluxEmits } from '../../components';

export default class Resources {
	list: ResourceWithOptions[] = shallowReactive([]);
	loader: Ref<ResourceLoader | null> = ref(null);
	emit: VueFluxEmits;

	constructor(emit: VueFluxEmits) {
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
		if (this.loader.value?.hasFinished() === false) {
			this.loader.value?.cancel();
		}

		this.list.splice(0);

		const resources = ResourcesMapper.withOptions(rscs);

		const updatePromise = new Promise<void>((resolve, reject) => {
			this.loader.value = new ResourceLoader(
				resources,
				numToPreload,
				displaySize,
				() => this.preloadStart(),
				(loaded: ResourceWithOptions[]) => this.preloadEnd(loaded, resolve),
				() => this.lazyLoadStart(),
				(loaded: ResourceWithOptions[]) => this.lazyLoadEnd(loaded),
				reject
			);
		});

		return updatePromise;
	}

	preloadStart() {
		this.emit('resourcesPreloadStart');
	}

	preloadEnd(loaded: ResourceWithOptions[], resolve: () => void) {
		this.list.push(...loaded);

		this.emit('resourcesPreloadEnd');

		resolve();
	}

	lazyLoadStart() {
		this.emit('resourcesLazyloadStart');
	}

	lazyLoadEnd(loaded: ResourceWithOptions[]) {
		this.list.push(...loaded);

		this.emit('resourcesLazyloadEnd');
	}
}
