<template>
	<transition name="fade">
		<div v-if="display" class="flux-controls">
			<flux-button class="prev top left" @click="vf.show('prev')">
				<polyline points="64,18 22,50 64,82" />
			</flux-button>

			<flux-button v-if="!vf.config.autoplay" class="play top" @click="vf.play('next', 1)">
				<polygon points="32,12 82,50 32,88" />
			</flux-button>

			<flux-button v-if="vf.config.autoplay" class="pause top" @click="vf.stop()">
				<line x1="32" y1="22" x2="32" y2="78" />
				<line x1="68" y1="22" x2="68" y2="78" />
			</flux-button>

			<flux-button class="next top right" @click="vf.show('next')">
				<polyline points="36,18 78,50 36,82" />
			</flux-button>
		</div>
	</transition>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';
	import FluxButton from '@/components/FluxButton.vue';

	export default {
		name: 'FluxControls',

		components: {
			FluxButton,
		},

		mixins: [
			BaseComplement,
		],

		computed: {
			display() {
				if (!this.vf)
					return false;

				if (!this.vf.loaded)
					return false;

				if (!this.vf.mouseOver)
					return false;

				return true;
			},

			autoplayClass() {
				return this.vf && this.vf.config.autoplay? 'pause' : 'play';
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux .flux-controls {
		flex: 1 1 0%;
		display: flex;
		justify-content: space-between;

		&.fade-enter, &.fade-leave-to {
			opacity: 0;
		}

		&.fade-enter-active, &.fade-leave-active {
			transition: opacity 0.3s ease-in;
		}

		.prev {
			margin-left: 4%;
		}

		.next {
			margin-right: 4%;
		}
	}
</style>
