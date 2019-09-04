export default {
	props: {
		slider: Object,
	},

	computed: {
		vf() {
			if (this.slider)
				return this.slider;

			if (this.$parent.$options.name === 'VueFlux')
				return this.$parent;

			throw new ReferenceError('slider not referenced, check https://deulos.github.com/vue-flux-docs/ for help');
		},

		captions() {
			return this.vf && this.vf.captions? this.vf.captions : {};
		},

		currentTransition() {
			return this.vf.Transitions.current;
		},

		previousImageIndex() {
			return this.vf.Images.previousIndex;
		},

		currentImageIndex() {
			return this.vf.Images.currentIndex;
		},

		nextImageIndex() {
			return this.vf.Images.next.index;
		},
	},

	methods: {
		getCaption(index) {
			if (index === undefined)
				index = this.currentImageIndex;

			return this.captions[index] || '';
		},

		getCaptionText(index) {
			let caption = this.getCaption(index);

			if (typeof caption === 'string')
				return caption;

			if (caption.text)
				return caption.text;

			return '';
		},
	},
};
