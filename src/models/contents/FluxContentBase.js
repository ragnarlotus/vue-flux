import { reactive, computed } from 'vue';

export default class FluxContentBase {
	content = reactive({
		size: null,
		aspectRatio: computed(() => this.getContentAspectRatio()),
	});

	view = reactive({
		size: null,
		aspectRatio: computed(() => this.getViewAspectRatio()),
	});

	cover = reactive({
		size: null,
		position: null,
	});

	updateContentSize(size) {
		this.content.size = size;

		if (this.view.size) {
			this.updateCoverSize();
			this.updateCoverPosition();
		}
	}

	getContentAspectRatio() {
		const { size } = this.content;

		return size.width / size.height;
	}

	updateViewSize(size) {
		this.view.size = size;
		this.updateViewAspectRatio();

		if (this.content.size) {
			this.updateCoverSize();
			this.updateCoverPosition();
		}
	}

	getViewAspectRatio() {
		const { size } = this.view;

		return size.width / size.height;
	}

	updateCoverSize() {
		const { view, content } = this;

		if (content.aspectRatio <= view.aspectRatio) {
			this.cover.size = {
				width: view.size.width,
				height: view.size.width / content.aspectRatio,
			};

			return;
		}

		this.cover.size = {
			width: content.aspectRatio * view.size.height,
			height: view.size.height,
		};
	}

	updateCoverPosition() {
		const { view, content } = this;

		if (content.aspectRatio <= view.aspectRatio) {
			this.cover.position = {
				top: (view.size.height - content.coverSize.height) / 2,
				left: 0,
			};

			return;
		}

		this.cover.position = {
			top: 0,
			left: (view.size.width - content.coverSize.width) / 2,
		};
	}

}
