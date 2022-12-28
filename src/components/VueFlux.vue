<script setup>
	import { onMounted, onUnmounted, ref, reactive, computed, watch } from 'vue';

	// Controllers
	import * as Controllers from '@/controllers';

	// Components
	import FluxTransition from '@/components/FluxTransition.vue';

	const $container = ref(null);
	const $transition = ref(null);
	const $displayComponent = ref(null);

	const props = defineProps({
		options: {
			type: Object,
			default: () => reactive({}),
		},

		transitions: {
			type: Array,
			required: true,
		},

		rscs: {
			type: Array,
			required: true,
		},
	});

	const config = reactive(
		Object.assign(
			{
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
			},
			props.options
		)
	);

	const timers = new Controllers.Timers();
	const player = new Controllers.Player(config, timers);
	const resources = new Controllers.Resources(config);
	const transitions = new Controllers.Transitions(config, timers);
	const display = new Controllers.Display(config, resources);
	const keys = new Controllers.Keys(config, player);
	const mouse = new Controllers.Mouse(config, timers);
	const touches = new Controllers.Touches(config, display, player, mouse);

	const setup = () => {
		Object.assign(config, props.options);
		mouse.setup();
		keys.setup();
	};

	watch(
		() => props.options,
		() => setup()
	);

	watch(
		() => props.rscs,
		() => updateFromProps('rscs')
	);

	watch(
		() => props.transitions,
		() => updateFromProps('transitions')
	);

	const updateFromProps = (elements) => {
		const wasPlaying = config.autoplay;

		player.stop(true);

		({
			rscs: () => resources.update(props.rscs),
			transitions: () => transitions.update(props.transitions),
		}[elements]());

		if (wasPlaying) {
			config.autoplay = true;
		}
	};

	onMounted(() => {
		setup();
		display.setup($container.value);

		transitions.setup(player, resources);
		resources.setup(player, display);
		player.setup(transitions, resources, $displayComponent);

		display.addResizeListener();
		transitions.update(props.transitions);
		resources.update(props.rscs);
	});

	onUnmounted(() => {
		timers.clear();
		display.removeResizeListener();
		keys.removeKeyListener();
	});

	const style = computed(() => {
		if (display.ready.value === false) {
			return {};
		}

		if (display.inFullScreen()) {
			return {
				width: '100% !important',
				height: '100% !important',
			};
		}

		const { width, height } = display.size;

		return {
			width: width + 'px',
			height: height + 'px',
		};
	});

	defineExpose({
		show: (resourceIndex, transitionIndex) =>
			player.show(resourceIndex, transitionIndex),
		play: (index, delay) => player.play(index, delay),
		stop: (cancelTransition) => player.stop(cancelTransition),
	});
</script>

<template>
	<div
		ref="$container"
		class="vue-flux"
		:style="style"
		@mousemove="mouse.toggle(true)"
		@mouseleave="mouse.toggle(false)"
		@dblclick="display.toggleFullScreen()"
		@touchstart="touches.start($event)"
		@touchend="touches.end($event)"
	>
		<FluxTransition
			v-if="player.transition.current !== null"
			ref="$transition"
			:transition="player.transition.current.component"
			:size="display.size"
			:from="player.resource.from.rsc"
			:to="player.resource.to.rsc"
			:display-component="$displayComponent"
			:options="player.transition.current.options"
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

		<div v-if="display.ready" class="complements">
			<slot name="preloader" :resources="resources" />

			<slot
				name="caption"
				:current-resource="player.resource.current"
				:current-transition="player.transition.current"
			/>

			<div class="remainder upper" />

			<slot
				name="controls"
				:current-resource="player.resource.current"
				:mouse-over="mouse.isOver"
				:player="player"
				:config="config"
			/>

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
				:display-ready="display.ready"
				:resources="resources"
				:current-resource="player.resource.current"
				:current-transition="player.transition.current"
				:show="(index) => player.show(index)"
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
