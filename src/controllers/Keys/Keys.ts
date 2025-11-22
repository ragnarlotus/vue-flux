import type { VueFluxConfig } from '../../components';
import { Directions, Player } from '../';

export default class Keys {
	config: VueFluxConfig;
	player: Player;

	constructor(config: VueFluxConfig, player: Player) {
		this.config = config;
		this.player = player;
	}

	setup() {
		this.removeKeyListener();

		if (this.config.bindKeys) {
			window.addEventListener('keydown', this.keydown);
		}
	}

	removeKeyListener() {
		window.removeEventListener('keydown', this.keydown);
	}

	keydown = (event: KeyboardEvent) => {
		if (['ArrowLeft', 'Left'].includes(event.key)) {
			this.player.show(Directions.prev);
			return;
		}

		if (['ArrowRight', 'Right'].includes(event.key)) {
			this.player.show(Directions.next);
			return;
		}
	};
}
