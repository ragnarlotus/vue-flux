<template>
	<div class="mask" :style="maskStyle" ref="mask">
		<component
			ref="transition"
			v-if="componentName"
			:is="componentName"
			:size="size"
			:from="from"
			:to="to"
			:options="transition.options"
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

		data: () => ({
			baseStyle: {
				position: 'relative',
				overflow: 'hidden',
				perspective: 'none',
				zIndex: 1,
			},
		}),

		props: {
			size: Object,

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

			options: Object,

			images: Array,
		},

		computed: {
			maskStyle() {
				let { width, height } = this.size;

				return {
					...this.baseStyle,
					width: width? width +'px' : '100%',
					height: height? height +'px' : '100%',
				};
			},

			componentName() {
				if (this.transition.component) {
					if (this.transition.name)
						return this.transition.name;

					let vfURL= 'https://deulos.github.com/vue-flux-docs/documentation-6/Components/VueFlux';

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
			this.play();
		},

		methods: {
			play() {
				this.$refs.transition.$options.played.call(this.$refs.transition);

				this.$emit('start');

				setTimeout(() => {
					this.$emit('end');
				}, this.getDuration());
			},

			getDuration() {
				if (!this.$refs.transition)
					return 1;

				return this.$refs.transition.totalDuration;
			},
		}
	}
</script>
