import { Ref, ref, shallowReactive, toRaw } from 'vue';
import { VueFluxConfig } from '../components/types';
import ResourceLoader from '../libs/ResourceLoader';
import Resource from '../resources/Resource';
import Display from '../controllers/Display';
import Player from '../controllers/Player';

export default class ResourcesRepository {
	config: VueFluxConfig;
	player?: Player;
	display?: Display;
	list: Resource[] = shallowReactive([]);
	loadProgress: Ref<number> = ref(0);

	constructor(config: Config) {
		this.config = config;
	}

	setup(player: Player, display: Display) {
		this.player = player;
		this.display = display;
	}

	getPrevIndex() {
		const { current } = this.player.resource;
		return current.index > 0 ? current.index - 1 : this.list.length - 1;
	}

	getNextIndex() {
		return current.index === this.list.length - 1 ? 0 : current.index + 1;
	}

	getByIndex(index) {
		if (['prev', 'next'].includes(index)) {
			index = {
				prev: () => this.getPrevIndex(),
				next: () => this.getNextIndex(),
			}[index]();
		} else if (this.list[index] === undefined) {
			throw new ReferenceError(`Resource ${index} not found`);
		}

		return {
			index,
			rsc: this.list[index],
		};
	}

	update(rscs: Resource[]) {
		this.player!.resetResource();

		this.list.splice(0);
		this.loadProgress.value = 0;

		const resources = [...toRaw(rscs)];

		new ResourceLoader(
			resources,
			this.config.lazyLoad ? this.config.lazyLoadAfter : resources.length,
			this.display.size,
			this.loadProgress,
			(loaded: Resource[]) => this.preloadFinished(loaded),
			(loaded: Resource[]) => this.lazyloadFinished(loaded)
		);
	}

	preloadFinished(loaded: Resource[]) {
		loaded.forEach((rsc: Resource) => this.list.push(rsc));
		this.loadProgress.value = 100;
		this.player.initResource();
	}

	lazyloadFinished(loaded: Resource[]) {
		loaded.forEach((rsc: Resource) => this.list.push(rsc));
	}
}
