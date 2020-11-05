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

		current: Object,

		options: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		mask() {
			return this.$parent.baseStyle;
		},
	},

	created() {
		Object.assign(this, { direction: 'next' }, this.options);

		let { direction } = this;

		let setup = {
			prev: this.setupPrev,
			next: this.setupNext,
		};

		setup[direction] && setup[direction]();
	},

	played() {
		let { direction } = this;

		let play = {
			prev: this.playPrev,
			next: this.playNext,
		};

		play[direction] && play[direction]();
	},

	methods: {
		getDelay(i) {
			let { direction } = this;

			let getDelay = {
				prev: this.getDelayPrev,
				next: this.getDelayNext,
			};

			return getDelay[direction](i);
		},

		getReadyness() {
			const min = 80;

			const getNumChilds = el => {
				let numChilds = el.$children.length;

				for (let child of el.$children)
					numChilds += getNumChilds(child);

				return numChilds
			}

			let time = getNumChilds(this) * 3;

			return time < min? min : time;
		},
	},

};
