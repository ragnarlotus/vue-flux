<template>
	<transition name="fade">
		<div v-if="caption()" class="flux-caption">{{ caption() }}</div>
	</transition>
</template>

<script>
	export default {
		props: {
			slider: {
				type: Object,
				required: false
			}
		},

		computed: {
			captions: function() {
				return this.slider.captions;
			}
		},

		methods: {
			caption: function() {
				if (this.slider.transition.current !== undefined)
					return '';

				let currentImage = this.slider.currentImage();

				if (currentImage === undefined)
					return '';

				if (this.captions[currentImage.index] === undefined)
					return '';

				return this.captions[currentImage.index];
			}
		}
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
