import { ref, shallowReactive, toRaw } from 'vue';
import ResourceLoader from '../libs/ResourceLoader';

export default class Resources {
	list = shallowReactive([]);
	loadProgress = ref(0);

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

		this.list.splice(0);
		this.loadProgress.value = 0;

		const resources = [...toRaw(rscs)];

		new ResourceLoader(
			resources,
			this.config.lazyLoad ? this.config.lazyLoadAfter : resources.length,
			this.display.size,
			this.loadProgress,
			(loaded) => this.preloadFinished(loaded),
			(loaded) => this.lazyloadFinished(loaded)
		);
	}

	preloadFinished(loaded) {
		loaded.forEach((rsc) => this.list.push(rsc));
		this.loadProgress.value = 100;
		this.player.initResource();
	}

	lazyloadFinished(loaded) {
		loaded.forEach((rsc) => this.list.push(rsc));
	}
}
