export default {
	data: () => ({
		totalDuration: 1,
	}),

	props: {
		size: Object,

		from: {
			type: [ String, Object ],
			required: true,
		},

		to: [ String, Object ],

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
		},
	},

	created() {
		Object.assign(this, this.options);

		let direction = this.getDirection();

		let setup = {
			prev: this.setupPrev,
			next: this.setupNext,
		};

		setup[direction] && setup[direction]();
	},

	played() {
		let direction = this.getDirection();

		let play = {
			prev: this.playPrev,
			next: this.playNext,
		};

		play[direction] && play[direction]();
	},

	methods: {
		getDirection() {
			return this.direction || 'next';
		},

		getDelay(i, direction) {
			if (!direction)
				direction = this.getDirection();

			let getDelay = {
				prev: this.getDelayPrev,
				next: this.getDelayNext,
			};

			return getDelay[direction](i);
		}
	},

};
