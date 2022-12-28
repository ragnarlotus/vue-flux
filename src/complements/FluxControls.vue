<script setup>
	import { computed } from 'vue';
	import FluxButton from '@/components/FluxButton.vue';

	const props = defineProps({
		config: {
			type: Object,
			required: true,
		},

		currentResource: {
			type: [Object, null],
			required: true,
		},

		mouseOver: {
			type: Object,
			required: true,
		},

		player: {
			type: Object,
			required: true,
		},
	});

	const visible = computed(() => {
		if (props.currentResource === null) {
			return false;
		}

		if (!props.mouseOver.value) {
			return false;
		}

		return true;
	});
</script>

<template>
	<transition name="fade">
		<div v-if="visible" class="flux-controls">
			<FluxButton class="prev top left" @click="player.show('prev')">
				<polyline points="64,18 22,50 64,82" />
			</FluxButton>

			<FluxButton
				v-if="!config.autoplay"
				class="play"
				@click="player.play('next', 1)"
			>
				<polygon points="32,12 82,50 32,88" />
			</FluxButton>

			<FluxButton
				v-if="config.autoplay"
				class="pause"
				@click="player.stop()"
			>
				<line x1="32" y1="22" x2="32" y2="78" />
				<line x1="68" y1="22" x2="68" y2="78" />
			</FluxButton>

			<FluxButton class="next top right" @click="player.show('next')">
				<polyline points="36,18 78,50 36,82" />
			</FluxButton>
		</div>
	</transition>
</template>

<style lang="scss">
	.vue-flux .flux-controls {
		flex: none;
		display: flex;
		justify-content: space-between;

		&.fade-enter,
		&.fade-leave-to {
			opacity: 0;
		}

		&.fade-enter-active,
		&.fade-leave-active {
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
