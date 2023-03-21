import { toRaw } from 'vue';
import Player from '../controllers/Player';

export default class TransitionsRepository {
	list: Object[] = [];
	player?: Player | null;

	setup(player: Player) {
		this.player = player;
	}

	update(transitions: Object[]) {
		this.player.resetTransition();

		this.list = toRaw(transitions);

		this.player.initTransition();
	}

	getPrevIndex(last) {
		return last.index > 0 ? last.index - 1 : this.list.length - 1;
	}

	getNextIndex(last) {
		return last.index === this.list.length - 1 ? 0 : last.index + 1;
	}

	getByIndex(index, last) {
		if (['prev', 'next'].includes(index)) {
			index = {
				prev: () => this.getPrevIndex(last),
				next: () => this.getNextIndex(last),
			}[index]();
		} else if (!this.list[index]) {
			throw new ReferenceError(`Transition ${index} not found`);
		}

		return {
			index,
			component: this.list[index].component ?? this.list[index],
			options: this.list[index].options ?? {},
		};
	}
}
