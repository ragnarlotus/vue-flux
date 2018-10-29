<template>
	<div class="vue-flux" :class="inFullscreen()? 'fullscreen' : ''" ref="container"
		@mouseover="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="toggleFullscreen()"
		@touchstart="touchStart"
		@touchend="touchEnd">

		<img v-for="(src, index) in preload" :key="index" :src="path + src" alt="" ref="images"
			@load="addImage(index)"
			@error="addImage(index)">

		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="transition.current" :is="transition.current" ref="transition" :slider="slider"></component>
			<flux-image :slider="slider" :index="image1Index" ref="image1"></flux-image>
			<flux-image :slider="slider" :index="image2Index" ref="image2"></flux-image>
		</div>

		<slot name="spinner">
			<div v-if="!loaded" class="spinner">
				<div class="pct">{{ this.loadPct }}%</div>
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
	import FluxImage from './FluxImage.vue';

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
				height: 'auto'
			},
			size: {
				width: undefined,
				height: undefined,
			},
			timer: undefined,
			transitionNames: [],
			transition: {
				current: undefined,
				last: undefined
			},
			mouseOver: false,
			touchStartX: 0,
			touchStartY: 0,
			touchStartTime: 0,
			touchEndTime: 0,
			image1Index: 0,
			image2Index: 1,
			imagesLoaded: 0,
			loaded: false,
			preload: [],
			properties: []
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
			path: {
				type: String,
				default: ''
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

			touchable: function() {
				return true == ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
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
				return Math.ceil(this.imagesLoaded * 100 / this.images.slice(0).length);
			},

			nextTransition: function() {
				if (!this.transitionNames.length)
					return undefined;

				let nextIndex = this.transition.last + 1;

				if (nextIndex >= this.transitionNames.length)
					nextIndex = 0;

				return this.transitionNames[nextIndex];
			}
		},

		watch: {
			options: function() {
				this.setOptions();
			},

			transitions: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.updateTransitions();

				if (wasPlaying)
					this.start();
			},

			images: function() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.$nextTick(() => {
					this.preloadImages();

					this.config.autoplay = wasPlaying;
				});
			}
		},

		created() {
			this.updateOptions();
			this.updateTransitions();
		},

		mounted() {
			this.resize();

			this.preloadImages();

			window.addEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.addEventListener('keydown', this.keydown);
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);

			if (this.config.bindKeys)
				window.removeEventListener('keydown', this.keydown);

			if (this.timer)
				clearTimeout(this.timer);
		},

		methods: {
			preloadImages() {
				if (this.images.length < 2 || this.transitionNames.length === 0)
					return;

				this.loaded = false;
				this.image1Index = 0;
				this.image2Index = 1;
				this.imagesLoaded = 0;

				this.$nextTick(() => {
					this.$refs.image1.setCss({ zIndex: 11 });
					this.$refs.image2.setCss({ zIndex: 10 });
				});

				this.preload = this.images.slice(0);
			},

			addImage(i) {
				this.imagesLoaded++;

				let img = this.$refs.images[i];

				if (img.naturalWidth || img.width) {
					this.properties[i] = {
						src: img.src,
						width: img.naturalWidth || img.width,
						height: img.naturalHeight || img.height
					};

				} else {
					console.warn('Image '+ this.images[i] +' could not be loaded');
				}

				if (i === 0)
					this.$refs.image1.init();

				if (this.imagesLoaded === this.preload.length)
					this.init();
			},

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
			},

			updateTransitions() {
				Object.assign(this.$options.components, this.transitions);

				this.transitionNames = Object.keys(this.transitions);

				if (this.transitionNames.length > 0)
					this.transition.last = this.transitionNames.length - 1;
			},

			currentImage() {
				if (this.$refs.image1 === undefined)
					return undefined;

				return this.$refs.image2.style.zIndex === 11? this.$refs.image2 : this.$refs.image1;
			},

			nextImage() {
				return this.$refs.image1.style.zIndex === 10? this.$refs.image1 : this.$refs.image2;
			},

			setTransitionOptions(transition, defaultValues = {}) {
				let transitionOptions = this.transitionOptions || {};
				let options = transitionOptions[this.transition.current] || {};

				let direction = 'right';

				if (this.currentImage().index > this.nextImage().index)
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
					// Find width
					if (!this.size.width) {
						let width = window.getComputedStyle(this.$refs.container).width;

						this.size.width = parseFloat(width);
					}

					// Find height
					if (this.config.height === 'auto') {
						let height = this.size.width / 16 * 9;

						if (this.$refs.container.clientHeight)
							height = window.getComputedStyle(this.$refs.container).height;

						else if (this.$refs.container.parentNode.clientHeight)
							height = window.getComputedStyle(this.$refs.container.parentNode).height;

						this.size.height = parseFloat(height);
					}

					this.$refs.image1.init();
					this.$refs.image2.init();
				});
			},

			init() {
				this.properties = this.properties.filter((p) => p);
				this.preload = [];
				this.loaded = true;

				this.$refs.image2.init();

				this.$nextTick(() => {
					this.$refs.image1.setCss({ zIndex: 11 });
					this.$refs.image2.setCss({ zIndex: 10 });

					this.$refs.image1.reference = 'image1Index';
					this.$refs.image2.reference = 'image2Index';

					if (this.config.autoplay === true)
						this.play();
				});
			},

			toggleMouseOver(over) {
				if (this.touchable)
					return;

				this.mouseOver = over;
			},

			inFullscreen() {
				return (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) !== undefined;
			},

			requestFullscreen() {
				let container = this.$refs.container;

				if (container.requestFullscreen)
					container.requestFullscreen();

				else if (container.mozRequestFullScreen)
					container.mozRequestFullScreen();

				else if (container.webkitRequestFullscreen)
					container.webkitRequestFullscreen();

				else if (container.msRequestFullscreen)
					container.msRequestFullscreen();
			},

			exitFullscreen() {
				if (document.exitFullscreen)
					document.exitFullscreen();

				else if (document.mozCancelFullScreen)
					document.mozCancelFullScreen();

				else if (document.webkitExitFullscreen)
					document.webkitExitFullscreen();

				else if (document.msExitFullscreen)
					document.msExitFullscreen();
			},

			toggleFullscreen() {
				if (this.fullscreen === false)
					return;

				if (this.inFullscreen())
					this.exitFullscreen();

				else
					this.requestFullscreen();

				this.resize();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				this.timer = setTimeout(() => {
					this.showImage(index);
				}, delay || this.config.delay);
			},

			stop() {
				this.config.autoplay = false;

				if (this.transition.current)
					this.transition.current = undefined;

				clearTimeout(this.timer);
			},

			toggleAutoplay() {
				if (this.config.autoplay)
					this.stop();

				else
					this.play(undefined, 1);
			},

			getIndex(index) {
				if (typeof index === 'number')
					return index;

				let currentIndex = this.currentImage().index;

				if (index === 'previous')
					return currentIndex > 0? currentIndex - 1 : this.properties.length - 1;

				return currentIndex + 1 < this.properties.length? currentIndex + 1 : 0;
			},

			setTransition(transition) {
				if (transition === undefined)
					transition = this.nextTransition;

				if (transition) {
					this.transition.last = this.transitionNames.indexOf(transition);
					this.transition.current = transition;
				}

				this.$nextTick(() => {
					this.transitionStart(transition);
				});
			},

			transitionStart(transition) {
				this.$emit('vueFlux-transitionStart');

				let timeout = 0;

				if (transition !== undefined)
					timeout = this.$refs.transition.totalDuration;

				this.timer = setTimeout(() => {
					this.transitionEnd();
				}, timeout);
			},

			transitionEnd() {
				let currentImage = this.currentImage();
				let nextImage = this.nextImage();

				currentImage.setCss({ zIndex: 10 });
				nextImage.setCss({ zIndex: 11 });
				this.transition.current = undefined;

				this.$nextTick(() => {
					if (this.config.infinite === false && nextImage.index === this.properties.length - 1) {
						this.stop();
						return;
					}

					if (this.config.autoplay === true) {
						this.timer = setTimeout(() => {
							this.showImage('next');
						}, this.config.delay);
					}

					this.$emit('vueFlux-transitionEnd');
				});
			},

			showImage(index, transition) {
				if (!this.loaded || this.$refs.image1 === undefined)
					return;

				if (this.transition.current !== undefined)
					return;

				if (this.currentImage().index === index)
					return;

				clearTimeout(this.timer);

				let nextImage = this.nextImage();

				this[nextImage.reference] = this.getIndex(index);
				nextImage.show();

				this.$nextTick(() => {
					this.setTransition(transition);
				});
			},

			keydown(event) {
				if (/ArrowLeft|Left/.test(event.key))
					this.showImage('previous');

				else if (/ArrowRight|Right/.test(event.key))
					this.showImage('next');
			},

			touchStart(event) {
				if (!this.config.enableGestures)
					return;

				event.preventDefault();

				this.touchStartTime = Date.now();
				this.touchStartX = event.touches[0].clientX;
				this.touchStartY = event.touches[0].clientY;
			},

			touchEnd(event) {
				if (!this.config.enableGestures)
					return;

				event.preventDefault();

				let previousTouchTime = this.touchEndTime;
				this.touchEndTime = Date.now();

				if (this.touchEndTime - previousTouchTime < 200) {
					this.toggleFullscreen();
					return;
				}

				let triggerX = Math.floor(this.size.width / 3);
				let offsetX = event.changedTouches[0].clientX - this.touchStartX;

				if (offsetX > 0 && offsetX > triggerX) {
					this.showImage('previous');
					return;
				}

				if (offsetX < 0 && offsetX < -triggerX) {
					this.showImage('next');
					return;
				}

				if (this.index === undefined)
					return;

				let triggerY = Math.floor(this.size.height / 3);
				let offsetY = event.changedTouches[0].clientY - this.touchStartY;

				if (offsetY < 0 && offsetY < -triggerY) {
					this.index.show();
					return;
				}
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
