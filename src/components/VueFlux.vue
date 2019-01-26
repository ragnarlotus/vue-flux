<template>
	<div class="vue-flux" :class="scrman.inFullScreen()? 'fullscreen' : ''" ref="container"
		@mousemove="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="toggleFullScreen()"
		@touchstart="touman.start"
		@touchend="touman.end">

		<img v-for="(url, index) in imaman.loading" :key="index" :src="config.path + url" alt="" ref="images"
			@load="imaman.add(index)"
			@error="imaman.add(index)">

		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="traman.current" :is="traman.current" ref="transition" :slider="slider"></component>
			<flux-image :slider="slider" :index="image1Index" ref="image1"></flux-image>
			<flux-image :slider="slider" :index="image2Index" ref="image2"></flux-image>
		</div>

		<slot name="spinner">
			<div v-if="!loaded" class="spinner">
				<div class="pct">{{ loadPct }}%</div>
				<div class="border"></div>
			</div>
		</slot>

		<slot name="caption"></slot>

		<slot name="controls"></slot>

		<slot name="index"></slot>

		<slot v-if="loaded" name="pagination"></slot>
	</div>
</template>

<script>
	import ScreenManager from '@/classes/ScreenManager.js';
	import TimersManager from '@/classes/TimersManager.js';
	import TransitionsManager from '@/classes/TransitionsManager.js';
	import ImagesManager from '@/classes/ImagesManager.js';
	import TouchManager from '@/classes/TouchManager.js';
	import FluxImage from '@/components/FluxImage.vue';

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
				fullscreen: false,
				infinite: true,
				delay: 5000,
				width: '100%',
				height: 'auto',
				autohideTime: 1500,
				lazyLoad: true,
				lazyLoadAfter: 3,
				path: ''
			},
			size: {
				width: undefined,
				height: undefined,
			},
			loaded: false,
			scrman: undefined,
			timman: undefined,
			traman: undefined,
			touman: undefined,
			imaman: undefined,
			mouseOver: false,
			image1Index: 0,
			image2Index: 1
		}),

		props: {
			options: {
				type: Object,
				default: () => {}
			},
			transitions: {
				type: Object,
				required: true
			},
			transitionOptions: {
				type: Object,
				default: () => {}
			},
			images: {
				type: Array,
				default: () => []
			},
			captions: {
				type: Array,
				default: () => []
			}
		},

		computed: {
			slider: function() {
				return this;
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
					height: this.size.height +'px'
				};
			},

			loadPct: function() {
				return Math.ceil(this.imaman.loaded * 100 / this.count) || 0;
			},
		},

		watch: {
			options: function() {
				this.updateOptions();
			},

			transitions: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.traman.update();

				wasPlaying && this.start();
			},

			images: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.$nextTick(() => {
					this.imaman.preload();

					this.config.autoplay = wasPlaying;
				});
			}
		},

		created() {
			this.scrman = new ScreenManager(this);
			this.timman = new TimersManager(this);
			this.traman = new TransitionsManager(this);
			this.imaman = new ImagesManager(this);
			this.touman = new TouchManager(this);

			this.updateOptions();
			this.traman.update();

			this.$emit('VueFlux-Created', this);
		},

		mounted() {
			this.resize();

			this.imaman.preload();

			if (this.config.autohideTime === 0)
				this.mouseOver = true;

			window.addEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.addEventListener('keydown', this.keydown);

			this.$emit('VueFlux-Mounted', this);
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.removeEventListener('keydown', this.keydown);

			this.timman.clear();

			this.$emit('VueFlux-Destroyed', this);
		},

		methods: {
			updateOptions() {
				let currentSize = {
					width: this.config.width,
					height: this.config.height
				};

				this.config = Object.assign({}, this.config, this.options);

				if (currentSize.width !== this.config.width || currentSize.height !== this.config.height) {
					this.size.width = this.config.width;
					this.size.height = this.config.height;

					this.resize();
				}

				this.$emit('VueFlux-OptionsUpdated', this);
			},

			setTransitionOptions(transition, defaultValues = {}) {
				let transitionOptions = this.transitionOptions || {};
				let options = transitionOptions[this.traman.current] || {};

				let direction = 'right';

				if (this.imaman.current().index > this.imaman.next().index)
					direction = 'left';

				Object.assign(transition, {
					direction: direction
				}, defaultValues, options);
			},

			resize() {
				this.size.width = undefined;
				this.size.height = undefined;

				if (this.config.width.indexOf('px') !== -1)
					this.size.width = parseInt(this.config.width);

				if (this.config.height.indexOf('px') !== -1)
					this.size.height = parseInt(this.config.height);

				if (this.size.width && this.size.height)
					return;

				this.$nextTick(() => {
					let container = this.$refs.container;

					// Find width
					if (!this.size.width) {
						let width = window.getComputedStyle(container).width;

						this.size.width = parseFloat(width);
					}

					// Find height
					if (this.config.height === 'auto') {
						let height = this.size.width / 16 * 9;

						if (container.clientHeight)
							height = window.getComputedStyle(container).height;

						this.size.height = parseFloat(height);
					}

					this.$refs.image1.init();
					this.$refs.image2.init();
				});
			},

			init() {
				this.loaded = true;

				this.$refs.image2.init();

				this.$nextTick(() => {
					this.$refs.image1.setCss({ zIndex: 11 });
					this.$refs.image2.setCss({ zIndex: 10 });

					this.$refs.image1.reference = 'image1Index';
					this.$refs.image2.reference = 'image2Index';

					if (this.config.autoplay === true)
						this.play();

					this.$emit('VueFlux-Ready', this);
				});
			},

			toggleMouseOver(over) {
				if (this.config.autohideTime === 0)
					return;

				this.timman.clear('mouse-over');

				if (over) {
					this.timman.mouseOver = setTimeout(() => {
						this.mouseOver = false;
					}, this.config.autohideTime);
				}

				this.mouseOver = over;
			},

			enterFullScreen() {
				if (this.config.fullscreen === false)
					return;

				ScreenManager.requestFullScreen(this.$refs.container);
			},

			exitFullScreen() {
				ScreenManager.exitFullScreen();
			},

			toggleFullScreen() {
				ScreenManager.inFullScreen()? this.exitFullScreen() : this.enterFullScreen();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				this.timman.image = setTimeout(() => {
					this.showImage(index);
				}, delay || this.config.delay);

				this.$emit('VueFlux-Play', this);
			},

			stop() {
				this.config.autoplay = false;

				if (this.traman.current)
					this.traman.current = undefined;

				this.timman.clear('image');

				this.$emit('VueFlux-Stop', this);
			},

			toggleAutoplay() {
				this.config.autoplay? this.stop() : this.play(undefined, 1);
			},

			showImage(index, transition) {
				if (this.loaded === false || this.$refs.image1 === undefined)
					return;

				if (this.traman.current !== undefined)
					return;

				if (this.imaman.current().index === index)
					return;

				let next = this.imaman.show(index, transition);

				this.$emit('VueFlux-Show', this, this[next.reference]);
			},

			keydown(event) {
				if (/ArrowLeft|Left/.test(event.key))
					this.showImage('previous');

				else if (/ArrowRight|Right/.test(event.key))
					this.showImage('next');
			}
		}
	}
</script>

<style lang="scss">
	.vue-flux {
		position: relative;

		&.fullscreen {
			width: 100%;
			height: 100%;
		}

		img {
			position: absolute;
			visibility: hidden;
		}
	}

	$spinner-size: 80px;

	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -($spinner-size / 2);
		margin-left: -($spinner-size / 2);
		width: $spinner-size;
		height: $spinner-size;
		z-index: 12;

		.pct {
			position: absolute;
			right: 0;
			left: 0;
			height: $spinner-size;
			line-height: $spinner-size;
			text-align: center;
			font-weight: bold;
			z-index: 1;
		}

		.border {
			width: 100%;
			height: 100%;
			border: 14px solid #f3f3f3;
			border-top-color: #3498db;
			border-bottom-color: #3498db;
			border-radius: 50%;
			background-color: #f3f3f3;
			animation: spin 2s linear infinite;
		}
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.mask {
		position: relative;
		overflow: visible;
	}
</style>
