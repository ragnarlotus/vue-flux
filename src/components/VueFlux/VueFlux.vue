<script setup lang="ts">
	import {
		onMounted,
		onUnmounted,
		ref,
		reactive,
		computed,
		watch,
		Ref,
	} from 'vue';
	import * as Controllers from '../../controllers';
	import * as Repositories from '../../repositories';
	import { FluxTransition } from '../';
	import { VueFluxProps, VueFluxEmits, VueFluxConfig } from './types';
	import type { Component } from 'vue';
	import { default as PlayerStatuses } from '../../controllers/Player/Statuses';

	const props = defineProps<VueFluxProps>();

	const emit = defineEmits<VueFluxEmits>();

	const $container: Ref<null | HTMLDivElement> = ref(null);
	const $transition: Ref<null | InstanceType<typeof FluxTransition>> =
		ref(null);
	const $displayComponent: Ref<null | Component> = ref(null);

	const config: VueFluxConfig = reactive({
		allowFullscreen: false,
		allowToSkipTransition: true,
		aspectRatio: '16:9',
		autohideTime: 2500,
		autoplay: false,
		bindKeys: false,
		delay: 5000,
		enableGestures: false,
		infinite: true,
		lazyLoad: true,
		lazyLoadAfter: 5,
	});

	const timers = new Controllers.Timers();
	const player = new Controllers.Player(config, timers, emit);
	const resources = new Repositories.Resources(emit);
	const transitions = new Repositories.Transitions();
	const display = new Controllers.Display($container, config, emit);
	const keys = new Controllers.Keys(config, player);
	const mouse = new Controllers.Mouse();
	const touches = new Controllers.Touches();

	const setup = () => {
		Object.assign(config, props.options);
		mouse.setup(config, timers);
		keys.setup();
	};

	watch(
		() => props.options,
		() => {
			setup();

			emit('optionsUpdated');
		},
		{ deep: true }
	);

	watch(
		() => props.rscs,
		async () => {
			const wasPlaying = player.status.value === PlayerStatuses.playing;

			if (wasPlaying) {
				await player.stop(true);
			}

			player.resource.reset();

			const numToPreload = config.lazyLoad
				? config.lazyLoadAfter
				: props.rscs.length;

			await resources.update(props.rscs, numToPreload, display.size);

			player.resource.init(resources);

			if (wasPlaying) {
				player.play();
			}
		}
	);

	watch(
		() => props.transitions,
		async () => {
			const wasPlaying = player.status.value === PlayerStatuses.playing;

			if (wasPlaying) {
				await player.stop(true);
			}

			player.transition.reset();

			transitions.update(props.transitions);

			player.transition.init(transitions);

			if (wasPlaying) {
				player.play();
			}

			emit('transitionsUpdated');
		}
	);

	onMounted(async () => {
		setup();

		await display.updateSize();
		display.addResizeListener();

		player.setup(resources, transitions, $displayComponent);

		transitions.update(props.transitions);
		player.transition.init(transitions);

		await resources.update(props.rscs, config.lazyLoadAfter, display.size);
		player.resource.init(resources);

		if (config.autoplay === true) {
			player.play();
		}

		emit('mounted');
	});

	onUnmounted(() => {
		timers.clear();
		display.removeResizeListener();
		keys.removeKeyListener();

		emit('unmounted');
	});

	const style = computed(() => {
		if (!display.size.isValid()) {
			return {};
		}

		if (display.inFullScreen()) {
			return {
				width: '100% !important',
				height: '100% !important',
			};
		}

		return display.size.toPx();
	});

	defineExpose({
		show: player.show.bind(player),
		play: player.play.bind(player),
		stop: player.stop.bind(player),
		getPlayer: () => player as Controllers.Player,
	});

	emit('created');
</script>

<template>
	<div
		ref="$container"
		class="vue-flux"
		:style="style"
		@mousemove="mouse.toggle(config, timers, true)"
		@mouseleave="mouse.toggle(config, timers, false)"
		@dblclick="display.toggleFullScreen()"
		@touchstart="touches.start($event, config)"
		@touchend="touches.end($event, config, player, display, timers, mouse)"
	>
		<FluxTransition
			v-if="
				/* eslint-disable vue/html-indent */
				player.transition.current !== null &&
				display.size.isValid() &&
				player.resource.from !== null &&
				player.resource.to !== null
				/* eslint-enable */
			"
			ref="$transition"
			:transition="player.transition.current.component"
			:size="display.size"
			:from="player.resource.from.rsc"
			:to="player.resource.to.rsc"
			:display-component="$displayComponent"
			:options="player.transition.current.options"
			@ready="$transition?.start()"
			@start="player.start()"
			@end="player.end()"
		/>

		<component
			:is="player.resource.current.rsc.display.component"
			v-if="player.resource.current !== null"
			ref="$displayComponent"
			:size="display.size"
			:rsc="player.resource.current.rsc"
			v-bind="player.resource.current.rsc.display.props"
		/>

		<div v-if="display.size.isValid()" class="complements">
			<slot name="preloader" :loader="resources.loader" />

			<slot
				name="caption"
				:current-resource="player.resource.current"
				:current-transition="player.transition.current"
			/>

			<div class="remainder upper" />

			<slot name="controls" :mouse-over="mouse.isOver" :player="player" />

			<div class="remainder lower" />

			<slot
				name="index"
				:mouse-over="mouse.isOver"
				:display-size="display.size"
				:resources="resources"
				:player="player"
			/>

			<slot
				name="pagination"
				:resources="resources"
				:current-resource="player.resource.current"
				:current-transition="player.transition.current"
				:show="(index: number) => player.show(index)"
			/>
		</div>
	</div>
</template>

<style lang="scss">
	.vue-flux {
		position: relative;

		.flux-transition {
			position: absolute;
		}

		& > .flux-image {
			position: absolute;
			top: 0;
			left: 0;
		}

		.complements {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			z-index: 45;

			.remainder {
				flex-basis: 50%;
			}
		}
	}
</style>
