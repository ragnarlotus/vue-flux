export default class Keys {
	setup(config, controller) {
		this.config = config;
		this.controller = controller;

		this.removeKeyListener();

		if (this.config.bindKeys) this.addKeyListener();
	}

	addKeyListener() {
		window.addEventListener('keydown', this.keydown, {
			passive: true,
		});
	}

	removeKeyListener() {
		window.removeEventListener('keydown', this.keydown);
	}

	keydown(event) {
		if (['ArrowLeft', 'Left'].includes(event.key)) {
			this.controller.show('prev');
			return;
		}

		if (['ArrowRight', 'Right'].includes(event.key)) {
			this.controller.show('next');
			return;
		}
	}
}
