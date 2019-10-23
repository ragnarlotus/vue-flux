<template>
	<transition name="fade">
		<slot v-if="caption" :caption="caption" :text="getCaptionText()">
			<div class="flux-caption">
				{{ getCaptionText() }}
			</div>
		</slot>
	</transition>
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

				if (this.Transitions.current)
					return '';

				return this.getCaption();
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux .flux-caption {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		font-size: 0.8rem;
		line-height: 1.1rem;
		padding: 6px;
		color: white;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.65);

		&.fade-enter, &.fade-leave-to {
			opacity: 0;
		}

		&.fade-enter-active {
			transition: opacity 0.3s ease-in;
		}
	}
</style>
