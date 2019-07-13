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

			return undefined;
		},
	},
};
