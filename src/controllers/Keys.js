export default class Keys {
	constructor(config, player) {
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

	keydown(event) {
		if (['ArrowLeft', 'Left'].includes(event.key)) {
			this.player.show('prev');
			return;
		}

		if (['ArrowRight', 'Right'].includes(event.key)) {
			this.player.show('next');
			return;
		}
	}
}
