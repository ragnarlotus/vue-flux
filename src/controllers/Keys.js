export default class Keys {
	construct(vf) {
		this.vf = vf;
	}

	setup() {
		this.removeKeyListener();

		if (this.vf.config.bindKeys)
			this.addKeyListener();
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
			this.vf.show('prev');
			return;
		}

		if (['ArrowRight', 'Right'].includes(event.key)) {
			this.vf.show('next');
			return;
		}
	}

}
