import { toRaw } from 'vue';
import ResourceLoader from '../libs/ResourceLoader';

export default class Resources {
	list = [];
	loadProgress = null;

	constructor(config) {
		this.config = config;
	}

	setup(player, display) {
		this.player = player;
		this.display = display;
	}

	getPrevIndex(current) {
		return current.index > 0 ? current.index - 1 : this.list.length - 1;
	}

	getNextIndex(current) {
		return current.index === this.list.length - 1 ? 0 : current.index + 1;
	}

	getByIndex(index, current) {
		if (['prev', 'next'].includes(index)) {
			index = {
				prev: () => this.getPrevIndex(current),
				next: () => this.getNextIndex(current),
			}[index]();
		} else if (this.list[index] === undefined) {
			throw new ReferenceError(`Resource ${index} not found`);
		}

		return {
			index,
			rsc: this.list[index],
		};
	}

	update(rscs) {
		this.player.resetResource();

		this.list.length = 0;

		const resources = [...toRaw(rscs)];

		const loader = new ResourceLoader(
			resources,
			this.config.lazyLoad ? this.config.lazyLoadAfter : resources.length,
			this.display.size,
			(loaded) => this.preloadFinished(loaded),
			(loaded) => this.lazyloadFinished(loaded)
		);

		this.loadProgress = loader.progress;
	}

	preloadFinished(loaded) {
		this.list = loaded;
		this.player.initResource();
	}

	lazyloadFinished(loaded) {
		this.list = this.list.concat(loaded);
	}
}
