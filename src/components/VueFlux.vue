<script setup>
	import {
		getCurrentInstance,
		onMounted,
		onUnmounted,
		ref,
		computed,
		watch,
	} from 'vue';

	// Controllers
	import DisplayController from '@/controllers/Display.js';
	import TimersController from '@/controllers/Timers.js';
	import TransitionsController from '@/controllers/Transitions.js';
	import ResourcesController from '@/controllers/Resources.js';
	import TouchesController from '@/controllers/Touches.js';
	import KeysController from '@/controllers/Keys.js';
	import MouseController from '@/controllers/Mouse.js';
	import ControllerController from '@/controllers/Controller.js';

	// Components
	import FluxTransition from '@/components/FluxTransition.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $container = ref(null);
	const $transition = ref(null);
	const $displayComponent = ref(null);

	const props = defineProps({
		options: {
			type: Object,
			default: () => ({}),
		},

		transitions: {
			type: Array,
			required: true,
		},

		rscs: {
			type: Array,
			default: () => ([]),
		},

		captions: {
			type: Array,
			default: () => ([]),
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
		path: '',
	};

	const instance = getCurrentInstance();
	const loaded = ref(false);

	const display = new DisplayController(instance);
	const timers = new TimersController();
	const resources = new ResourcesController(instance);
	const keys = new KeysController(instance);
	const mouse = new MouseController(instance);
	const touches = new TouchesController(instance);
	const transitions = new TransitionsController(instance);
	const controller = new ControllerController(instance);

	const setup = () => {
		Object.assign(config, props.options);

		mouse.setup();
		keys.setup();
	};

	watch(props.options, () => {
		setup();
	});

	watch(props.rscs, () => {
		updateFromProps('rscs');
	});

	watch(props.transitions, () => {
		updateFromProps('transitions');
	});

	const updateFromProps = prop => {
		const wasPlaying = this.config.autoplay;

		stop(true);

		const toUpdate = {
			rscs: () => resources.update(props.rscs),
			transitions: () => transitions.update(props.transitions),
		};

		toUpdate[prop]();

		wasPlaying && controller.play();
	};

	onMounted(() => {
		display.updateSize();
		setup();

		resources.update(props.rscs);
		transitions.update(props.transitions);
	});

	onUnmounted(() => {
		display.removeResizeListener();
		keys.removeKeyListener();
		timers.clear();
	});

	const style = computed(() => {
		if (!display.size.height)
			return {};

		if (display.inFullScreen) {
			return {
				width: '100% !important',
				height: '100% !important',
			};
		}

		const { width, height } = display.size;

		return {
			width: width +'px',
			height: height +'px',
		};
	});

	defineExpose({
		show: controller.show,
		play: controller.play,
		stop: controller.stop,
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
			v-if="transitions.current.value"
			ref="$transition"
			:transition="transitions.list[transitions.current.value]"
			:size="display.size"
			:from="controller.resource.from"
			:to="controller.resource.to"
			:display-component="$displayComponent"
			:options="transitions.current.options"
			:rscs="resources.list"
			@start="transitions.start()"
			@end="transitions.end()"
		/>

		<FluxImage
			v-if="resources.current"
			ref="$displayComponent"
			:size="size"
			:rsc="resources.current"
		/>

		<div v-if="size.height" class="complements">
			<slot name="preloader" />
			<slot name="caption" />
			<div class="remainder upper" />
			<slot name="controls" />
			<div class="remainder lower" />
			<slot name="index" />
			<slot v-if="loaded" name="pagination" />
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
