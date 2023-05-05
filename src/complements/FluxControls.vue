<script setup lang="ts">
	import { Ref, computed } from 'vue';
	import { FluxButton } from '../components';
	import { Config } from '../components/VueFlux/types';
	import { ResourceIndex } from '../repositories/Resrouces/types';
	import { Player } from '../controllers';
	import { Directions } from '../types';

	export interface Props {
		config: Config;
		currentResource: null | ResourceIndex;
		mouseOver: Ref<boolean>;
		player: Player;
	}

	const props = defineProps<Props>();

	const visible = computed<boolean>(() => {
		if (props.currentResource === null) {
			return false;
		}

		if (props.mouseOver.value === false) {
			return false;
		}

		return true;
	});
</script>

<template>
	<transition name="fade">
		<div v-if="visible" class="flux-controls">
			<FluxButton
				class="prev top left"
				@click="player.show(Directions.prev)"
			>
				<polyline points="64,18 22,50 64,82" />
			</FluxButton>

			<FluxButton
				v-if="!config.autoplay"
				class="play"
				@click="player.play(Directions.next, 1)"
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

			<FluxButton
				class="next top right"
				@click="player.show(Directions.next)"
			>
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
