export default {
	props: {
		size: {
			type: Object,
			required: false,
		},

		from: {
			type: [ String, Object ],
			required: true,
		},

		to: {
			type: [ String, Object ],
			required: false,
		},

		options: {
			type: Object,
			required: false,
		},
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
