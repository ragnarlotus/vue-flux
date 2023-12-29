import { Resources, ResourceIndex } from '../../repositories';

export default class PlayerResource {
	current: ResourceIndex | null = null;
	from: ResourceIndex | null = null;
	to: ResourceIndex | null = null;

	reset() {
		this.current = null;
		this.from = null;
		this.to = null;
	}

	init(repository: Resources) {
		this.current = repository.getFirst();
	}

	currentSameAs(resourceTo: ResourceIndex) {
		if (this.current!.index === resourceTo.index) {
			return true;
		}

		return false;
	}

	prepareTo(resourceTo: ResourceIndex) {
		this.from = this.current;
		this.to = resourceTo;
	}
}
