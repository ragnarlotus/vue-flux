export default {
	props: {
		size: Object,

		from: {
			type: [ String, Object ],
			required: true,
		},

		to: {
			type: [ String, Object ],
		},

		options: Object,
	},

	computed: {
		mask() {
			return this.$parent.baseStyle;
		},

		current() {
			if (this.$parent.$parent)
				return this.$parent.$parent.$refs.image;

			return undefined;
		}
	},

	created() {
		Object.assign(this, this.options);
	},
}
