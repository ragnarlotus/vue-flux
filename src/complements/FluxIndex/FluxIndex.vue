<script setup lang="ts">
	import { ref, computed, Ref } from 'vue';
	import { Size } from '../../shared';
	import { Player } from '../../controllers';
	import Button from './Button/Button.vue';
	import List from './List/List.vue';

	export interface Props {
		mouseOver?: Ref<boolean>;
		displaySize: Size;
		player: Player;
	}

	const props = withDefaults(defineProps<Props>(), {
		mouseOver: undefined,
	});

	const $fluxIndexList: Ref<null | InstanceType<typeof List>> = ref(null);

	const visible = computed<boolean>(
		() => props.player.resources.list.length > 0
	);
</script>

<template>
	<div v-if="visible" class="flux-index">
		<Button
			v-if="mouseOver"
			:mouse-over="mouseOver"
			@click="$fluxIndexList?.show()"
		/>

		<List
			ref="$fluxIndexList"
			:display-size="displaySize"
			:player="player"
			:mouse-over="mouseOver"
		/>
	</div>
</template>

<style lang="scss">
	.vue-flux .flux-index {
		flex: none;
		margin-bottom: 2%;
		font-size: 0;
		text-align: center;

		nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: block;
			margin: 0;
			overflow: hidden;
			visibility: hidden;
		}

		nav.visible {
			z-index: 101;
			visibility: visible;
		}

		ul {
			display: block;
			height: 100%;
			margin: 0;
			margin-top: 100%;
			padding: 24px 0 0 24px;
			list-style-type: none;
			text-align: center;
			overflow-y: auto;
			background-color: black;
			transition: all 0.5s linear;
			font-size: 0;
		}
	}
</style>
