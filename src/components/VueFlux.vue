<template>
	<div ref="container"
		class="vue-flux"
		:style="style"
		@mousemove="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="toggleFullScreen()"
		@touchstart="Touches.start"
		@touchend="Touches.end">

		<img alt="" ref="loading"
			v-for="(url, index) in Images.loading" :key="index"
			v-if="Images.loading[index]"
			:src="config.path + url"
			@load="Images.addProperties(index)"
			@error="Images.addProperties(index)">

		<flux-transition
			v-if="Transitions.current"
			:transition="Transitions.current"
			:size="size"
			:from="Images.previous"
			:to="Images.current"
			:options="Transitions.options"
			ref="transition">
		</flux-transition>

		<flux-image :size="size" :image="Images.current" ref="image"></flux-image>

		<slot name="preloader"></slot>

		<slot name="caption"></slot>

		<slot name="controls"></slot>

		<slot name="index"></slot>

		<slot v-if="loaded" name="pagination"></slot>
	</div>
</template>

<script>
	// Libraries
	import DomHelper from '@/libraries/DomHelper.js';

	// Controllers
	import DisplayController from '@/controllers/Display.js';
	import TimersController from '@/controllers/Timers.js';
	import TransitionsController from '@/controllers/Transitions.js';
	import ImagesController from '@/controllers/Images.js';
	import TouchesController from '@/controllers/Touches.js';

	// Components
	import FluxTransition from '@/components/FluxTransition.vue';
	import FluxImage from '@/components/FluxImage.vue';

	let Display, Timers, Transitions, Images, Touches;

	export default {
		name: 'VueFlux',

		components: {
			FluxImage,
			FluxTransition,
		},

		data: () => ({
			config: {
				autoplay: false,
				bindKeys: false,
				enableGestures: false,
				allowFullscreen: false,
				infinite: true,
				delay: 5000,
				autohideTime: 1500,
				lazyLoad: true,
				lazyLoadAfter: 3,
				allowToSkipTransition: true,
				path: '',
			},
			size: {
				width: undefined,
				height: undefined,
			},
			loaded: false,
			mouseOver: false,
			Display: undefined,
			Timers: undefined,
			Transitions: undefined,
			Touches: undefined,
			Images: undefined,
		}),

		props: {
			options: {
				type: Object,
				default: () => ({}),
			},

			transitions: {
				type: Array,
				required: true,
			},

			images: {
				type: Array,
				default: () => ([]),
			},

			captions: {
				type: Array,
				default: () => ([]),
			},
		},

		computed: {
			style() {
				let style = {};

				if (this.size.width)
					style.width = this.size.width +'px';

				if (this.size.height)
					style.height = this.size.height +'px';

				return style;
			},
		},

		watch: {
			options() {
				this.updateOptions();
			},

			transitions() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				Transitions.update();

				wasPlaying && this.start();
			},

			images() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.$nextTick(() => {
					Images.load(this.images);

					this.config.autoplay = wasPlaying;
				});
			},
		},

		created() {
			Display = this.Display = new DisplayController(this);
			Timers = this.Timers = new TimersController(this);
			Transitions = this.Transitions = new TransitionsController(this);
			Images = this.Images = new ImagesController(this);
			Touches = this.Touches = new TouchesController(this);

			this.updateOptions();
			Transitions.update();

			this.$emit('created');
		},

		mounted() {
			this.resize();

			Images.load(this.images);

			if (this.config.autohideTime === 0)
				this.mouseOver = true;

			window.addEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.addEventListener('keydown', this.keydown);

			this.$emit('mounted');
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.removeEventListener('keydown', this.keydown);

			Timers.clear();

			this.$emit('destroyed');
		},

		methods: {
			updateOptions() {
				Object.assign(this.config, this.options);

				this.resize();

				this.$emit('options-updated');
			},

			resize() {
				this.size = {};

				this.$nextTick(() => {
					let size = DomHelper.sizeFrom(this.$refs.container);

					if (!size.height)
						size.height = size.width / 16 * 9;

					this.size = size;
				});
			},

			getSlot(name) {
				if (this.$slots[name])
					return this.$slots[name][0].componentInstance;

				return undefined;
			},

			init() {
				this.loaded = true;

				this.$nextTick(() => {
					if (this.config.autoplay === true)
						this.play();

					this.$emit('ready');
				});
			},

			toggleMouseOver(over) {
				if (this.config.autohideTime === 0)
					return;

				Timers.clear('mouseOver');

				this.mouseOver = over;

				if (this.mouseOver) {
					Timers.set('mouseOver', this.config.autohideTime, () => {
						this.mouseOver = false;
					});

				} else {
					this.mouseOver = false;
					Timers.clear('mouseOver');
				}
			},

			enterFullScreen() {
				if (this.config.allowFullscreen === false)
					return;

				Display.requestFullScreen(this.$refs.container);
			},

			exitFullScreen() {
				Display.exitFullScreen();
			},

			toggleFullScreen() {
				Display.inFullScreen()? this.exitFullScreen() : this.enterFullScreen();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				Timers.set('image', delay || this.config.delay, () => {
					this.showImage(index);
				});

				this.$emit('play');
			},

			stop() {
				this.config.autoplay = false;

				if (Transitions.current)
					Transitions.cancel();

				Timers.clear('image');

				this.$emit('stop');
			},

			toggleAutoplay() {
				this.config.autoplay? this.stop() : this.play(undefined, 1);
			},

			showImage(index, transition) {
				if (this.loaded === false || this.$refs.image === undefined)
					return;

				if (Transitions.current !== undefined) {
					if (this.config.allowToSkipTransition) {
						Transitions.cancel();

						this.$nextTick(() => {
							this.showImage(index, transition);
						});
					}

					return;
				}

				if (Images.current.index === index)
					return;

				Images.show(index, transition);

				this.$emit('show');
			},

			keydown(event) {
				if (/ArrowLeft|Left/.test(event.key))
					this.showImage('previous');

				else if (/ArrowRight|Right/.test(event.key))
					this.showImage('next');
			},
		},
	}
</script>

<style lang="scss">
	.vue-flux {
		position: relative;

		img {
			position: absolute;
			visibility: hidden;
		}
	}
</style>
