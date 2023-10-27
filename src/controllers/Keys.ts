import { Config } from '../components/VueFlux/types';
import { Directions } from '../controllers/Player';
import Player from './Player/Player';

export default class Keys {
	config: Config;
	player: Player;

	constructor(config: Config, player: Player) {
		this.config = config;
		this.player = player;
	}

	setup() {
		this.removeKeyListener();

		if (this.config.bindKeys) {
			this.addKeyListener();
		}
	}

	addKeyListener() {
		window.addEventListener('keydown', (event) => this.keydown(event), {
			passive: true,
		});
	}

	removeKeyListener() {
		window.removeEventListener('keydown', () => this.keydown);
	}

	keydown(event: KeyboardEvent) {
		if (['ArrowLeft', 'Left'].includes(event.key)) {
			this.player.show(Directions.prev);
			return;
		}

		if (['ArrowRight', 'Right'].includes(event.key)) {
			this.player.show(Directions.next);
			return;
		}
	}
}
