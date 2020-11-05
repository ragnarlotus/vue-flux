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

			throw new ReferenceError('slider not referenced, check https://ragnarlotus.github.com/vue-flux-docs/ for help');
		},

		captions() {
			return this.vf && this.vf.captions? this.vf.captions : {};
		},

		Transitions() {
			return this.vf.Transitions;
		},

		Images() {
			return this.vf.Images;
		},
	},

	methods: {
		getCaption(index) {
			if (index === undefined)
				index = this.Images.current? this.Images.current.initIndex : '';

			return this.captions[index] || '';
		},

		getCaptionText(index) {
			let caption = this.getCaption(index);

			return caption.text || caption || '';
		},
	},
};
