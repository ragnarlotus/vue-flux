<template>
	<div class="vue-flux" ref="container">
		<img v-for="(src, index) in preload" :key="src" :src="path + src" alt="" @load="addImage(index)" @error="addImage(index)" ref="images">

		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="transition.current" :is="transition.current" ref="transition" :slider="slider" :direction="direction"></component>
			<flux-image v-if="!preload.length" :slider="slider" :index="image1Index" ref="image1"></flux-image>
			<flux-image v-if="!preload.length" :slider="slider" :index="image2Index" ref="image2"></flux-image>
		</div>

		<div v-if="!loaded" class="spinner"></div>

		<div class="caption" :class="currentCaption? 'display' : ''">{{ currentCaption }}</div>

		<flux-controls v-if="config.showControls && loaded" :slider="slider" ref="controls">
			<template v-if="typeof $slots.controls !== 'undefined'" slot="controls">
				<slot name="controls"></slot>
			</template>
		</flux-controls>

		<flux-pagination v-if="config.showPagination && loaded" :slider="slider" ref="pagination">
			<template v-if="typeof $scopedSlots.paginationItem !== 'undefined'" slot-scope="paginationItem" slot="paginationItem">
				<slot name="paginationItem" :index="paginationItem.index"></slot>
			</template>
		</flux-pagination>
	</div>
</template>

<script>
	import FluxImage from './FluxImage.vue';
	import FluxControls from './FluxControls.vue';
	import FluxPagination from './FluxPagination.vue';

	export default {
		name: 'VueFlux',

		components: {
			FluxImage,
			FluxControls,
			FluxPagination
		},

		data: () => ({
			config: {
				autoplay: false,
				fullscreen: false,
				delay: 5000,
				showPagination: false,
				showControls: false,
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

			controls: function() {
				return this.$refs.controls;
			},

			pagination: function() {
				return this.$refs.pagination;
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

			currentImage: function() {
				if (this.$refs.image1 === undefined)
					return undefined;

				return this.$refs.image1.style.zIndex === 11? this.$refs.image1 : this.$refs.image2;
			},

			nextImage: function() {
				return this.$refs.image1.style.zIndex === 10? this.$refs.image1 : this.$refs.image2;
			},

			currentCaption: function() {
				if (!this.loaded)
					return '';

				if (this.transition.current !== undefined)
					return '';

				if (this.currentImage === undefined)
					return '';

				if (this.captions[this.currentImage.index] === undefined)
					return '';

				return this.captions[this.currentImage.index];
			},

			nextTransition: function() {
				if (!this.transitionNames.length)
					return undefined;

				let nextIndex = this.transition.last + 1

				if (nextIndex >= this.transitionNames.length)
					nextIndex = 0;

				return this.transitionNames[nextIndex];
			},

			direction: function() {
				return this.currentImage.index < this.nextImage.index? 'right' : 'left';
			}
		},

		created() {
			this.config = Object.assign({}, this.config, this.options);

			this.size.width = this.config.width;
			this.size.height = this.config.height;

			Object.assign(this.$options.components, this.transitions);

			this.transitionNames = Object.keys(this.transitions);

			if (this.transitionNames.length > 0)
				this.transition.last = this.transitionNames.length - 1;
		},

		mounted() {
			if (this.images.length < 2 || this.transitionNames.length === 0)
				return;

			this.preloadImages(this.images);

			window.addEventListener('resize', this.resize);
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);
		},

		methods: {
			preloadImages(images) {
				this.preload = images.slice(0);
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
				}

				if (this.imagesLoaded === this.preload.length)
					this.init();
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
					this.size.width = this.$refs.container.offsetWidth;

					// Find height
					if (this.config.height === 'auto' && this.$refs.container.offsetHeight) {
						this.size.height = this.$refs.container.offsetHeight;

					} else {
						this.size.height = Math.floor(this.size.width / 16 * 9);
					}

					this.$refs.image1.initImage();
					this.$refs.image2.initImage();
				});
			},

			init() {
				this.properties = this.properties.filter((p) => p);
				this.preload = [];
				this.resize();

				this.$nextTick(() => {
					this.$refs.image1.setCss({ zIndex: 11 });
					this.$refs.image2.setCss({ zIndex: 10 });

					this.$refs.image1.reference = 'image1Index';
					this.$refs.image2.reference = 'image2Index';

					this.loaded = true;

					if (this.config.autoplay === true)
						this.play();
				});
			},

			play(index) {
				this.config.autoplay = true;

				this.timer = setTimeout(() => {
					this.showImage(index);
				}, this.config.delay);
			},

			stop() {
				this.config.autoplay = false;

				clearTimeout(this.timer);
			},

			toggleAutoplay() {
				if (this.config.autoplay)
					this.stop();

				else
					this.play();
			},

			getIndex(index) {
				if (typeof index === 'number')
					return index;

				let currentIndex = this.currentImage.index;

				if (index === 'previous')
					return currentIndex > 0? currentIndex - 1 : this.images.length - 1;

				return currentIndex + 1 < this.images.length? currentIndex + 1 : 0;
			},

			showImage(index, transition) {
				if (!this.loaded || this.$refs.image1 === undefined)
					return;

				// If there is a transition running prevent showing new image
				if (this.transition.current !== undefined)
					return false;

				if (this.currentImage.index === index)
					return false;

				clearTimeout(this.timer);

				// Get image index if next or previous
				index = this.getIndex(index);

				// Prepare images
				let currentImage = this.currentImage;
				let nextImage = this.nextImage;

				this[nextImage.reference] = index;
				nextImage.show();

				this.$nextTick(() => {
					// Get transition
					if (transition === undefined)
						transition = this.nextTransition;

					if (transition) {
						this.transition.last = this.transitionNames.indexOf(transition);
						this.transition.current = transition;
					}

					this.$nextTick(() => {
						let timeout = transition !== undefined? this.$refs.transition.totalDuration + 20 : 0;

						setTimeout(() => {
							currentImage.setCss({ zIndex: 10 });
							nextImage.setCss({ zIndex: 11 });

							this.transition.current = undefined;

							// Play next if autoplay is true
							if (this.config.autoplay === true) {
								this.timer = setTimeout(() => {
									this.showImage('next');
								}, this.config.delay);
							}
						}, timeout);
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vue-flux {
		position: relative;

		img {
			position: absolute;
			visibility: hidden;
		}
	}

	.spinner {
		position: absolute;
		left: 50%;
		top: 120px;
		margin-left: -60px;
		border: 16px solid #f3f3f3;
		border-top: 16px solid #3498db;
		border-bottom: 16px solid #3498db;
		border-radius: 50%;
		width: 120px;
		height: 120px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.mask {
		position: relative;
		overflow: visible;
	}

	.caption {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 8px;
		color: white;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.65);
		opacity: 0;
		transition: opacity 0.3s ease-in;
		z-index: 100;
	}

	.caption.display {
		opacity: 1;
	}
</style>
