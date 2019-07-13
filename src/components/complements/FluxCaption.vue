<template>
	<transition name="fade">
		<slot v-if="caption" :caption="caption" :text="text">
			<div class="flux-caption">{{ text }}</div>
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
			text() {
				if (typeof this.caption === 'string')
					return this.caption;

				if (this.caption.text)
					return this.caption.text;

				return '';
			},

			caption() {
				if (!this.vf)
					return '';

				if (this.vf.loaded === false)
					return '';

				if (this.vf.Transitions.current !== undefined)
					return '';

				let currentImage = this.vf.Images.current;

				if (currentImage === undefined)
					return '';

				return this.captions[currentImage.index] || '';
			},

			captions() {
				return this.vf? this.vf.captions : {};
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
		padding: 8px;
		color: white;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.65);
		z-index: 100;

		&.fade-enter, &.fade-leave-to {
			opacity: 0;
		}

		&.fade-enter-active, &.fade-leave-active {
			transition: opacity 0.3s ease-in;
		}
	}
</style>
