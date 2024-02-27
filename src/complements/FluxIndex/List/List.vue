<script setup lang="ts">
	import { Ref, computed, nextTick, ref } from 'vue';
	import { Player } from '../../../controllers';
	import Thumb from '../Thumb/Thumb.vue';
	import { Size } from '../../../shared';
	import useThumbs from '../Thumb/useThumbs';

	export interface Props {
		displaySize: Size;
		player: Player;
		mouseOver?: Ref<boolean>;
	}

	const props = withDefaults(defineProps<Props>(), {
		mouseOver: undefined,
	});

	const $list: Ref<null | HTMLUListElement> = ref(null);

	const animationTime = 500;
	const visible: Ref<boolean> = ref(false);

	const listClass = computed<string[]>(() => {
		const classes = [];

		if (visible.value) {
			classes.push('visible');
		}

		return classes;
	});

	async function show() {
		if ($list.value === null) {
			return;
		}

		props.player.stop();
		visible.value = true;

		await nextTick();

		$list.value.clientHeight;
		$list.value.style.marginTop = '0';
	}

	function hide(resourceIndex: null | number) {
		if ($list.value === null) {
			return;
		}

		if (props.player.resource.current?.index === resourceIndex) {
			return;
		}

		if (props.mouseOver !== undefined) {
			$list.value.clientHeight;
			$list.value.style.marginTop = '100%';
		}

		setTimeout(() => {
			visible.value = false;

			if (resourceIndex !== null) {
				props.player.show(resourceIndex);
			}
		}, animationTime);
	}

	const thumbs = useThumbs(props.displaySize, props.player);

	defineExpose({ show });
</script>

<template>
	<nav :class="listClass" @click="hide(null)">
		<ul ref="$list">
			<Thumb
				v-for="(rsc, index) in player.resources!.list"
				:key="index"
				:rsc="rsc.resource"
				:size="thumbs.size"
				:class="thumbs.getClass(index)"
				@click="hide(index)"
			/>
		</ul>
	</nav>
</template>

<style lang="scss">
	.vue-flux .flux-index {
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
