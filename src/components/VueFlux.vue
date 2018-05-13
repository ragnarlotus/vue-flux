<template>
	<div class="vue-flux" ref="container">
		<img v-for="(src, index) in preload" :key="src" :src="path + src" alt="" @load="addImage(index)" @error="addImage(index)" ref="images">

		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="transition.current" :is="transition.current" ref="transition" :slider="slider" :direction="direction"></component>
			<flux-image v-if="preloadCompleted" :slider="slider" :index="image1Index" ref="image1"></flux-image>
			<flux-image v-if="preloadCompleted" :slider="slider" :index="image2Index" ref="image2"></flux-image>
		</div>
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
				fullscreen: false,
				delay: 5000,
				showPagination: false,
				paginationContent: 'index',
				showControls: false,
				showCaption: false,
				width: '100%',
				height: 'auto'
			},
			size: {
				width: 0,
				height: 0,
			},
			background: {
				color: '',
				image: ''
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
			preloadCompleted: false,
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
			}
		},

		computed: {
			slider: function() {
				return this;
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
				return this.$refs.image1.style.zIndex === 11? this.$refs.image1 : this.$refs.image2;
			},

			nextImage: function() {
				return this.$refs.image1.style.zIndex === 10? this.$refs.image1 : this.$refs.image2;
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
		},

		methods: {
			preloadImages(images) {
				this.preload = JSON.parse(JSON.stringify(images));
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

			init() {
				// Find width
				if (this.config.width.indexOf('px') !== -1) {
					this.size.width = parseInt(this.config.width);

				} else if (this.$refs.mask.offsetParent !== null) {
					this.size.width = this.$refs.mask.offsetWidth;

				} else {
					this.size.width = this.$refs.container.offsetWidth;
				}

				// Find height
				if (this.config.height.indexOf('px') !== -1) {
					this.size.height = parseInt(this.config.height);

				} else if (this.config.height === 'auto' && this.$refs.container.offsetHeight) {
					this.size.height = this.$refs.container.offsetHeight;

				} else {
					this.size.height = Math.floor(this.size.width / 16 * 9);
				}

				this.properties = this.properties.filter((p) => p);
				this.preloadCompleted = true;
				this.preload = [];

				this.$nextTick(() => {
					this.$refs.image1.reference = 'image1Index';
					this.$refs.image2.reference = 'image2Index';

					this.$refs.image1.setCss({ zIndex: 11 });
					this.$refs.image2.setCss({ zIndex: 10 });

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

			getIndex(index) {
				if (typeof index === 'number')
					return index;

				let currentIndex = this.currentImage.index;

				if (index === 'previous')
					return currentIndex > 0? currentIndex - 1 : this.images.length - 1;

				return currentIndex + 1 < this.images.length? currentIndex + 1 : 0;
			},

			showImage(index, transition) {
				if (!this.preloadCompleted)
					return;

				// If there is a transition running prevent showing new image
				if (this.transition.current !== undefined)
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
					if (transition === undefined && this.transitionNames.length > 0) {
						this.transition.last = this.transition.last + 1 >= this.transitionNames.length? 0 : this.transition.last + 1;

						transition = this.transitionNames[this.transition.last];
					}

					if (transition)
						this.transition.current = transition;

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
