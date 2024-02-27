<script setup lang="ts">
	import { Ref, computed, unref } from 'vue';
	import { Player, Directions } from '../../controllers/Player';
	import * as Buttons from './buttons';
	import { default as PlayerStatuses } from '../../controllers/Player/Statuses';

	export interface Props {
		mouseOver?: Ref<boolean>;
		player: Player;
	}

	const props = withDefaults(defineProps<Props>(), {
		mouseOver: undefined,
	});

	const visible = computed<boolean>(() => {
		if (props.player.resource.current === null) {
			return false;
		}

		if (props.mouseOver !== undefined && unref(props.mouseOver) === false) {
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
				v-if="
					(player.status.value || player.status) === PlayerStatuses.stopped
				"
				@click="player.play(Directions.next, 1)"
			/>
			<Buttons.Stop
				v-if="
					(player.status.value || player.status) === PlayerStatuses.playing
				"
				@click="player.stop()"
			/>
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
