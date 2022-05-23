export const baseProps = {
	size: Object,

	from: {
		type: [ String, Object ],
		required: true,
	},

	to: [ String, Object ],

	current: Object,

	options: {
		type: Object,
		default: () => ({}),
	},

	maskStyle: Object,
};

export default (options, conf) => {
	Object.assign(conf, { direction: 'next' }, options);
}
