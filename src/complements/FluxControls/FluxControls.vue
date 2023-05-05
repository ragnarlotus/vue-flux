<script setup lang="ts">
	import { Ref, computed } from 'vue';
	import { Config } from '../../components/VueFlux/types';
	import { ResourceIndex } from '../../repositories/Resrouces/types';
	import { Player } from '../../controllers';
	import { Directions } from '../../types';
	import * as Buttons from './buttons';

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
			<Buttons.Prev @click="player.show(Directions.prev)" />
			<Buttons.Play
				v-if="!config.autoplay"
				@click="player.play(Directions.next, 1)"
			/>
			<Buttons.Stop v-if="config.autoplay" @click="player.stop()" />
			<Buttons.Next @click="player.show(Directions.next)" />
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
