<template>
	<div ref="mask" class="flux-transition" :style="style">
		<component
			:is="componentName"
			v-if="componentName"
			ref="transition"
			:size="size"
			:from="from"
			:to="to"
			:current="current"
			:options="options"
			:images="images"
		/>
	</div>
</template>

<script>
	import * as transitions from '@/transitions';

	export default {
		name: 'FluxTransition',

		components: {
			...transitions,
		},

		props: {
			size: {
				type: Object,
				required: true,
			},

			transition: {
				type: [ String, Object ],
				required: true,
			},

			from: {
				type: [ String, Object ],
				required: true,
			},

			to: {
				type: [ String, Object ],
				required: true,
			},

			current: Object,

			options: Object,

			images: Array,
		},

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
				perspective: 'none',
				zIndex: 3,
			},
		}),

		computed: {
			style() {
				let { width, height } = this.size;

				return {
					...this.baseStyle,
					width: width +'px',
					height: height +'px',
				};
			},

			componentName() {
				if (this.transition.component) {
					if (this.transition.name)
						return this.transition.name;

					let vfURL= 'https://ragnarlotus.github.com/vue-flux-docs/documentation-6/Components/VueFlux';

					throw new ReferenceError(`Transition undefined, check ${vfURL}`);
				}

				let name = this.transition.name || this.transition;
				name = 'Transition'+ name[0].toUpperCase() + name.slice(1);

				if (name in transitions === false) {
					name = this.transition.name || this.transition;
					throw new ReferenceError (`Transition ${name} does not exist`);
				}

				return name;
			},
		},

		created() {
			if (this.transition.component)
				this.$options.components[this.componentName] = this.transition.component;
		},

		mounted() {
			setTimeout(() => {
				this.$emit('ready');
			}, this.$refs.transition.getReadyness());
		},

		methods: {
			start() {
				this.$refs.transition.$options.played.call(this.$refs.transition);

				this.$emit('start', {
					transition: this.transition,
					from: this.from,
					to: this.to,
					options: this.options,
				});

				setTimeout(() => {
					this.end();
				}, this.getDuration());
			},

			end() {
				this.$emit('end', {
					transition: this.transition,
					from: this.from,
					to: this.to,
					options: this.options,
				});
			},

			getDuration() {
				if (!this.$refs.transition)
					return 1;

				return this.$refs.transition.totalDuration;
			},
		}
	}
</script>

<style lang="scss">
	.flux-transition {
		position: relative;
	}
</style>
