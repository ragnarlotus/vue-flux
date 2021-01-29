export default {
	color: String,

	colors: {
		type: Object,
		default: () => ({}),
	},

	image: [ String, Object ],

	images: Object,

	size: {
		type: Object,
	},

	viewSize: {
		type: Object,
		default: () => ({}),
	},

	offset: Object,

	offsets: {
		type: Object,
		default: () => ({}),
	},

	css: Object,
};
