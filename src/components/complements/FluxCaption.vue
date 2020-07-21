<template>
	<div v-if="caption" :class="htmlClass">
		<slot :caption="caption" :text="getCaptionText()">
			{{ getCaptionText() }}
		</slot>
	</div>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';

	export default {
		name: 'FluxCaption',

		mixins: [
			BaseComplement,
		],

		computed: {
			caption() {
				if (!this.vf)
					return '';

				if (!this.vf.loaded)
					return '';

				return this.getCaption();
			},

			htmlClass() {
				const css = ['flux-caption'];

				if (!this.Transitions.current)
					css.push('visible');

				return css;
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux .flux-caption {
		flex: none;
		width: 100%;
		font-size: 0.8rem;
		line-height: 1.1rem;
		padding: 6px;
		box-sizing: border-box;
		color: white;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.65);
		opacity: 0;

		&.visible {
			opacity: 1;
			transition: opacity 0.3s ease-in;
		}
	}
</style>
