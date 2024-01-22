import { ResourceIndex } from '../../../repositories';

export default class PlayerResource {
	current: ResourceIndex | null = null;
	from: ResourceIndex | null = null;
	to: ResourceIndex | null = null;

	reset = vi.fn();
	init = vi.fn();
	currentSameAs = vi.fn();
	prepareTo = vi.fn();
}
