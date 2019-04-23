<template>
	<div class="mask" :style="maskStyle" ref="mask">
		<component
			:is="componentName"
			:size="size"
			:from="from"
			:to="to"
			:options="transition.options">
		</component>
	</div>
</template>

<script>
	import transitions from '@/transitions';

	export default {
		name: 'FluxTransition',

		components: {
			...transitions,
		},

		data: () => ({
			baseStyle: {
				position: 'relative',
				overflow: 'hidden',
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
				return {
					...this.baseStyle,
					width: this.size.width +'px' || '100%',
					height: this.size.height +'px' || '100%',
				};
			},

			componentName() {
				if (this.transition.component)
					return this.transition.name;

				let name = this.transition.name || this.transition;
				name = 'transition'+ name[0].toUpperCase() + name.slice(1);

				if (name in transitions === false)
					return undefined;

				return name;
			},
		},

		created() {
			if (this.transition.component)
				Object.assign(this.$options.components, this.transition.component);
		}
	}
</script>
