<script setup>
	import {
		getCurrentInstance,
		onMounted,
		onUnmounted,
		ref,
		computed,
		watch,
		nextTick,
		defineExpose
	} from 'vue';

	// Controllers
	import DisplayController from '@/controllers/Display.js';
	import TimersController from '@/controllers/Timers.js';
	import TransitionsController from '@/controllers/Transitions.js';
	import ResourcesController from '@/controllers/Resources.js';
	import TouchesController from '@/controllers/Touches.js';
	import KeysController from '@/controllers/Keys.js';
	import MouseController from '@/controllers/Mouse.js';

	// Components
	import FluxTransition from '@/components/FluxTransition.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $renderingComponent = ref(null);

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
	let loaded = false;

	const display = new DisplayController(instance);
	const timers = new TimersController(instance);
	const resources = new ResourcesController(instance);
	const keys = new KeysController(instance);
	const mouse = new MouseController(instance);
	const touches = new TouchesController(instance);
	const transitions = new TransitionsController(instance);

	const setup = () => {
		Object.assign(config, props.options);

		mouse.setup();
		keys.setup();
	};

	onMounted(() => {
		display.updateSize();
		setup();
	});

	onUnmounted(() => {
		display.removeResizeListener();
		keys.removeKeyListener();
		timers.clear();
	});

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

		wasPlaying && play();
	};

	const play = (index = 'next', delay) => {
		config.autoplay = true;

		if (!transitions.current) {
			timers.set('transition', delay || config.delay, () => {
				show(index);
			});
		}
	};

	const stop = (cancelTransition = false) => {
		config.autoplay = false;

		timers.clear('transition');

		if (transitions.current && cancelTransition)
			transitions.end(true);
	};

	const show = (index = 'next', transition) => {
		if (!loaded || !$renderingComponent.value)
			return;

		if (transitions.current) {
			if (config.allowToSkipTransition) {
				transitions.end(true);

				nextTick(() => {
					show(index, transition);
				});
			}

			return;
		}

		const from = resources.current;
		const to = resources.getByIndex(index);
		const direction = ['prev', 'next'].includes(index)? index : undefined;

		transitions.run(transition, from, to, direction);
	};

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
		show,
		play,
		stop,
	});
</script>

<template>
	<div
		ref="container"
		class="vue-flux"
		:style="style"
		@mousemove="mouse.toggle(true)"
		@mouseleave="mouse.toggle(false)"
		@dblclick="display.toggleFullScreen()"
		@touchstart="touches.start($event)"
		@touchend="touches.end($event)"
	>
		<FluxTransition
			v-if="transitions.current"
			ref="transition"
			:transition="transitions.current"
			:size="size"
			:from="transitions.from"
			:to="transitions.to"
			:rendering-component="$renderingComponent"
			:options="transitions.current.options"
			:images="resources.list"
			@start="transitions.start()"
			@end="transitions.end()"
		/>

		<FluxImage
			v-if="resources.current"
			ref="$renderingComponent"
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
