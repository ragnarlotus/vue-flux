<script setup lang="ts">
	import {
		onMounted,
		onUnmounted,
		ref,
		reactive,
		computed,
		watch,
		Ref,
		toRaw,
	} from 'vue';
	import * as Controllers from '../../controllers';
	import { FluxComponent, FluxTransition } from '../';
	import { VueFluxProps, VueFluxEmits, VueFluxConfig } from './types';
	import { default as PlayerStatuses } from '../../controllers/Player/Statuses';

	const props = withDefaults(defineProps<VueFluxProps>(), {
		options: () => ({}),
	});

	const emit = defineEmits<VueFluxEmits>();

	const $el: Ref<null | HTMLDivElement> = ref(null);
	const $transition: Ref<null | InstanceType<typeof FluxTransition>> =
		ref(null);
	const $displayComponent: Ref<null | FluxComponent> = ref(null);

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
	const resources = player.resources;
	const transitions = player.transitions;
	const display = new Controllers.Display($el, config, emit);
	const keys = new Controllers.Keys(config, player);
	const mouse = new Controllers.Mouse();
	const touches = new Controllers.Touches();

	const setup = () => {
		Object.assign(config, props.options);
		mouse.setup(config, timers);
		keys.setup();
	};

	watch(props.options, () => {
		setup();
		emit('optionsUpdated');
	});

	async function updateProp(propName: 'rscs' | 'transitions') {
		const wasPlaying = player.status.value === PlayerStatuses.playing;

		if (wasPlaying) {
			await player.stop(true);
		}

		const propsUpdater = {
			rscs: async () => await updateResources(),
			transitions: () => updateTransitions(),
		};

		await propsUpdater[propName]();

		if (wasPlaying) {
			player.play();
		}
	}

	async function updateResources() {
		player.resource.reset();

		const numToPreload = config.lazyLoad
			? config.lazyLoadAfter
			: props.rscs.length;

		try {
			await resources.update(toRaw(props.rscs), numToPreload, display.size);
		} catch (e) {
			console.error(e);
		}

		if (resources.list.length) {
			player.resource.init(resources);
		}
	}

	watch(
		() => props.rscs,
		async () => {
			await updateProp('rscs');
		},
		{ deep: false }
	);

	function updateTransitions() {
		player.transition.reset();

		transitions.update(toRaw(props.transitions));

		player.transition.init(transitions);
	}

	watch(
		props.transitions,
		async () => {
			await updateProp('transitions');
			emit('transitionsUpdated');
		},
		{ deep: false }
	);

	onMounted(async () => {
		setup();

		await display.updateSize();
		display.addResizeListener();

		player.setup($displayComponent);

		updateTransitions();

		await updateResources();

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
		size: display.size,
	});

	emit('created');
</script>

<template>
	<div
		ref="$el"
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

			<slot name="caption" :player="player" />

			<div class="remainder upper" />

			<slot name="controls" :mouse-over="mouse.isOver" :player="player" />

			<div class="remainder lower" />

			<slot
				name="index"
				:mouse-over="mouse.isOver"
				:display-size="display.size"
				:player="player"
			/>

			<slot name="pagination" :player="player" />
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
