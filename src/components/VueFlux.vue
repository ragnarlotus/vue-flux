<template>
	<div class="vue-flux"
		:class="Display.inFullScreen()? 'fullscreen' : ''" ref="container"
		@mousemove="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="toggleFullScreen()"
		@touchstart="Touches.start"
		@touchend="Touches.end">

		<img alt="" ref="loading"
			v-for="(url, index) in Images.loading" :key="index"
			v-if="Images.loading[index]"
			:src="config.path + url"
			@load="Images.add(index)"
			@error="Images.add(index)">

		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="Transitions.current" :is="Transitions.current" ref="transition" :slider="slider"></component>

			<flux-image :slider="slider" :display-size="size" ref="image1"></flux-image>
			<flux-image :slider="slider" :display-size="size" ref="image2"></flux-image>
		</div>

		<slot name="preloader"></slot>

		<slot name="caption"></slot>

		<slot name="controls"></slot>

		<slot name="index"></slot>

		<slot v-if="loaded" name="pagination"></slot>
	</div>
</template>

<script>
	import DomHelper from '@/classes/DomHelper.js';
	import DisplayController from '@/controllers/Display.js';
	import TimersController from '@/controllers/Timers.js';
	import TransitionsController from '@/controllers/Transitions.js';
	import ImagesController from '@/controllers/Images.js';
	import TouchesController from '@/controllers/Touches.js';
	import FluxImage from '@/components/FluxImage.vue';

	let Display, Timers, Transitions, Images, Touches;

	export default {
		name: 'VueFlux',

		components: {
			FluxImage
		},

		data: () => ({
			config: {
				autoplay: false,
				bindKeys: false,
				enableGestures: false,
				allowFullscreen: false,
				infinite: true,
				delay: 5000,
				width: '100%',
				height: 'auto',
				autohideTime: 1500,
				lazyLoad: true,
				lazyLoadAfter: 3,
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
				default: () => {},
			},

			transitions: {
				type: Object,
				required: true,
			},

			transitionOptions: {
				type: Object,
				default: () => {},
			},

			images: {
				type: Array,
				default: () => [],
			},

			captions: {
				type: Array,
				default: () => [],
			},
		},

		computed: {
			slider: function() {
				return this;
			},

			preloader: function() {
				if (this.$slots['preloader'])
					return this.$slots['preloader'][0].componentInstance;

				return undefined;
			},

			caption: function() {
				if (this.$slots['caption'])
					return this.$slots['caption'][0].componentInstance;

				return undefined;
			},

			controls: function() {
				if (this.$slots['controls'])
					return this.$slots['controls'][0].componentInstance;

				return undefined;
			},

			index: function() {
				if (this.$slots['index'])
					return this.$slots['index'][0].componentInstance;

				return undefined;
			},

			pagination: function() {
				if (this.$slots['pagination'])
					return this.$slots['pagination'][0].componentInstance;

				return undefined;
			},

			mask: function() {
				return this.$refs.mask;
			},

			sizePx: function() {
				if (typeof this.size.width !== 'number' || typeof this.size.height !== 'number')
					return {};

				return {
					width: this.size.width +'px',
					height: this.size.height +'px',
				};
			},
		},

		watch: {
			options: function() {
				this.updateOptions();
			},

			transitions: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				Transitions.update();

				wasPlaying && this.start();
			},

			images: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.$nextTick(() => {
					Images.preload();

					this.config.autoplay = wasPlaying;
				});
			},
		},

		created() {
			Display = this.Display = new DisplayController(this, 'container');
			Timers = this.Timers = new TimersController(this);
			Transitions = this.Transitions = new TransitionsController(this);
			Images = this.Images = new ImagesController(this);
			Touches = this.Touches = new TouchesController(this);

			this.updateOptions();
			Transitions.update();

			this.$emit('vf-created', this);
		},

		mounted() {
			this.resize();

			this.$refs.image1.setCss({ zIndex: 11 });
			this.$refs.image2.setCss({ zIndex: 10 });

			Images.preload();

			if (this.config.autohideTime === 0)
				this.mouseOver = true;

			window.addEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.addEventListener('keydown', this.keydown);

			this.$emit('vf-mounted', this);
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.removeEventListener('keydown', this.keydown);

			Timers.clear();

			this.$emit('vf-destroyed', this);
		},

		methods: {
			updateOptions() {
				let currentSize = {
					width: this.config.width,
					height: this.config.height,
				};

				this.config = {
					...this.config,
					...this.options,
				};

				if (currentSize.width !== this.config.width || currentSize.height !== this.config.height) {
					this.size.width = this.config.width;
					this.size.height = this.config.height;

					this.resize();
				}

				this.$emit('vf-options-updated', this);
			},

			resize() {
				let size = {};

				if (this.config.width.indexOf('px') !== -1)
					size.width = parseFloat(this.config.width);

				if (this.config.height.indexOf('px') !== -1)
					size.height = parseFloat(this.config.height);

				if (size.width && size.height) {
					this.size = size;
					return;
				}

				this.$nextTick(() => {
					let container = new DomHelper(this.$refs.mask);

					// Find width
					if (!size.width)
						size.width = container.getWidth();

					// Find height
					if (this.config.height === 'auto') {
						let height = size.width / 16 * 9;

						if (container.hasHeight())
							height = container.getHeight();

						size.height = height;
					}

					this.size = size;

					this.$refs.image1.init();
					this.$refs.image2.init();
				});
			},

			init() {
				this.loaded = true;

				this.$nextTick(() => {
					if (this.config.autoplay === true)
						this.play();

					this.$emit('vf-ready', this);
				});
			},

			toggleMouseOver(over) {
				if (this.config.autohideTime === 0)
					return;

				Timers.clear('mouse-over');

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
				Display.inFullScreen()? this.exitFullScreen() : this.exitFullScreen();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				Timers.set('image', delay || this.config.delay, () => {
					this.showImage(index);
				});

				this.$emit('vf-play', this);
			},

			stop() {
				this.config.autoplay = false;

				if (Transitions.current)
					Transitions.current = undefined;

				Timers.clear('image');

				this.$emit('vf-stop', this);
			},

			toggleAutoplay() {
				this.config.autoplay? this.stop() : this.play(undefined, 1);
			},

			showImage(index, transition) {
				if (this.loaded === false || this.$refs.image1 === undefined)
					return;

				if (Transitions.current !== undefined)
					return;

				if (Images.current.index === index)
					return;

				let next = Images.show(index, transition);

				this.$emit('vf-show', this, this[next.reference]);
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

		&.allowFullscreen {
			width: 100%;
			height: 100%;
		}

		img {
			position: absolute;
			visibility: hidden;
		}
	}

	.mask {
		position: relative;
		overflow: visible;
	}
</style>
