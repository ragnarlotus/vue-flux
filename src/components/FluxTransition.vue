<template>
	<div class="mask" :style="maskStyle" ref="mask">
		<flux-image v-if="!mounted" :size="size" :image="from" />

		<component
			v-if="componentName"
			:is="componentName"
			:size="size"
			:from="from"
			:to="to"
			:options="transition.options"
			ref="transition" />
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage';
	import * as transitions from '@/transitions';

	export default {
		name: 'FluxTransition',

		components: {
			FluxImage,
			...transitions,
		},

		data: () => ({
			mounted: false,
			baseStyle: {
				position: 'relative',
				overflow: 'hidden',
				perspective: 'none',
				zIndex: 1,
			},
		}),

		props: {
			size: {
				type: Object,
				required: false,
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

			options: {
				type: Object,
				required: false,
			},
		},

		computed: {
			maskStyle() {
				let size = this.size;

				return {
					...this.baseStyle,
					width: size.width? size.width +'px' : '100%',
					height: size.height? size.height +'px' : '100%',
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
					return undefined;
				}

				return name;
			},
		},

		created() {
			Object.assign(this.$options.components, this.transition.component);
		},

		mounted() {
			this.mounted = true;

			this.$emit('start');

			setTimeout(() => {
				this.$emit('end');
			}, this.getDuration());
		},

		methods: {
			getDuration() {
				if (!this.$refs['transition'])
					return 1;

				return this.$refs['transition'].totalDuration;
			},
		}
	}
</script>
