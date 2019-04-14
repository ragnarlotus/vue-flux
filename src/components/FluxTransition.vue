<template>
	<div>
		<component
			:is="transition"
			:size="displaySize"
			:from="$refs.from"
			:to="$refs.to">
		</component>

		<flux-image :slider="slider" :css="from.css" ref="from"></flux-image>
		<flux-image :slider="slider" :css="to.css" ref="to"></flux-image>
	</div>
</template>

<script>
	import DomHelper from '@/classes/DomHelper.js';

	export default {
		name: 'FluxTransition',

		data: () => ({
			displaySize: {
				width: undefined,
				height: undefined,
			},

			fromCss: {
				zIndex: 10,
			},

			toCss: {
				zIndex: 11,
			},
		}),

		props: {
			size: {
				type: Object,
				required: false,
			},

			transition: {
				type: Object,
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
		},

		created() {
			this.displaySize = this.size;

			if (!this.displaySize)
				this.displaySize = (new DomHelper(this.$el)).getSize();
		},
	}
</script>
