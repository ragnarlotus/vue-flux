<script setup>
	import {
		getCurrentInstance,
		onMounted,
		onUnmounted,
		ref,
		reactive,
		computed,
		watch,
	} from 'vue';

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
			default: () => [],
		},

		captions: {
			type: Array,
			default: () => [],
		},
	});

	const config = {
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
		lazyLoadAfter: 3,
	};

	const display = new Controllers.Display();
	const timers = new Controllers.Timers();
	const resources = new Controllers.Resources();
	const keys = new Controllers.Keys();
	const mouse = new Controllers.Mouse();
	const touches = new Controllers.Touches();
	const transitions = new Controllers.Transitions();
	const controller = new Controllers.Controller();

	const setup = () => {
		Object.assign(config, props.options);

		display.setup(config, $container.value, resources);
	};

	watch(
		() => props.options,
		() => {
			setup();
		}
	);

	watch(
		() => props.rscs,
		() => {
			updateFromProps('rscs');
		}
	);

	watch(
		() => props.transitions,
		() => {
			updateFromProps('transitions');
		}
	);

	const updateFromProps = (prop) => {
		const wasPlaying = config.autoplay;

		stop(true);

		({
			rscs: () => resources.update(props.rscs),
			transitions: () => transitions.update(props.transitions),
		}[prop]());

		if (wasPlaying) {
			controller.play();
		}
	};

	onMounted(() => {
		setup();

		mouse.setup(config, timers);
		keys.setup(config, controller);
		resources.setup(config, controller, display);
		transitions.setup(config, controller, resources, timers);
		touches.setup(config, display, controller, mouse);
		controller.setup(
			config,
			transitions,
			resources,
			timers,
			$displayComponent
		);

		display.addResizeListener();
		resources.update(props.rscs);
		transitions.update(props.transitions);
	});

	onUnmounted(() => {
		display.removeResizeListener();
		keys.removeKeyListener();
		timers.clear();
	});

	const style = computed(() => {
		if (!display || !display.size.height) {
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
		display,
		timers,
		resources,
		keys,
		mouse,
		touches,
		transitions,
		ready: () => resources.ready(),
		show: () => controller.show(),
		play: () => controller.play(),
		stop: () => controller.stop(),
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
			v-if="controller.transition.value !== null"
			ref="$transition"
			:transition="controller.transition.value.component"
			:size="display.size"
			:from="controller.resource.from.rsc"
			:to="controller.resource.to.rsc"
			:display-component="$displayComponent"
			:options="controller.transition.value.options"
			@start="transitions.start()"
			@end="transitions.end()"
		/>

		<component
			:is="resources.current.value.rsc.display.component"
			v-if="resources.current.value !== null"
			ref="$displayComponent"
			:size="display.size"
			:rsc="resources.current.value.rsc"
			v-bind="resources.current.value.rsc.display.props"
		/>

		<div v-if="display.size.height" class="complements">
			<slot name="preloader" />
			<slot name="caption" />
			<div class="remainder upper" />
			<slot name="controls" />
			<div class="remainder lower" />
			<slot name="index" />
			<slot v-if="resources.ready" name="pagination" />
			<slot name="description" />
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
