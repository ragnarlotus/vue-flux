import { Resources } from '../../repositories';
import { ResourceIndex } from '../../repositories/Resources/types';

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
}
