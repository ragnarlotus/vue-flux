<template>
	<div class="vue-flux" ref="container">
		<img v-for="(src, index) in preload" :key="src" :src="path + src" alt="" @load="addImage(index)" ref="images">
		<div class="mask" :style="sizePx" ref="mask">
			<component v-if="transition.current" :is="transition.current" ref="transition" :slider="slider" :direction="direction"></component>
			<flux-image v-if="imagesLoaded" :slider="slider" :index="image1Index" ref="image1"></flux-image>
			<flux-image v-if="imagesLoaded" :slider="slider" :index="image2Index" ref="image2"></flux-image>
		</div>

		<button @click="showImage('next')">NEXT</button>
	</div>
</template>

<script>
	import FluxImage from './FluxImage.vue';
	import Transitions from './transitions';

	export default {
		name: 'VueFlux',

		components: {
			FluxImage,
			...Transitions
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
			transition: {
				current: undefined,
				last: undefined
			},
			image1Index: 0,
			image2Index: 1,
			imagesLoaded: false,
			preload: [],
			properties: []
		}),

		props: {
			options: {
				type: Object,
				default: () => {}
			},
			transitions: {
				type: Array,
				default: () => ['blocks2d2']
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

			sizePx: function() {
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

			if (this.transitions.length > 0)
				this.transition.last = this.transitions.length - 1;
		},

		mounted() {
			this.background.color = this.css(this.$refs.container, 'backgroundColor');
			this.background.image = this.css(this.$refs.container, 'backgroundImage');

			if (this.background.image)
				this.background.image += '; ';

			this.preloadImages(this.images);
		},

		methods: {
			css(element, styleName, styleValue) {
				if (styleValue === undefined)
					return element.style[styleName];

				element.style[styleName] = styleValue;
			},

			preloadImages(images) {
				this.preload = JSON.parse(JSON.stringify(images));
			},

			addImage(i) {
				let img = this.$refs.images[i];

				this.properties[i] = {
					src: img.src,
					width: img.naturalWidth || img.width,
					height: img.naturalHeight || img.height
				};

				if (this.properties.length === this.preload.length) {
					this.imagesLoaded = true;
					this.preload = [];

					this.init();
				}
			},

			init() {
				// Find width
				if (this.config.width.indexOf('px') != -1) {
					this.size.width = parseInt(this.config.width);

				} else if (this.$refs.mask.offsetParent !== null) {
					this.size.width = this.$refs.mask.offsetWidth;

				} else {
					this.size.width = this.$refs.container.offsetWidth;
				}

				// Find height
				if (this.config.height.indexOf('px') !== -1) {
					this.size.height = parseInt(this.config.height);

				} else if (this.config.height === 'auto') {
					// Find tallest image
					let maxRatio = 0;
					let ratio = 0;

					for (var i = 0; i < this.properties.length; i++) {
						ratio = this.properties[i].height / this.properties[i].width;

						if (ratio > maxRatio)
							maxRatio = ratio;
					}

					this.size.height = parseInt(this.size.width * maxRatio);

				} else {
					this.size.height = this.$refs.mask.offsetHeight;
				}

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
				// If there is a transition running prevent showing new image
				if (this.transition.current !== undefined)
					return false;

				// Get image index if next or previous
				index = this.getIndex(index);

				// Prepare images
				let currentImage = this.currentImage;
				let nextImage = this.nextImage;

				this[nextImage.reference] = index;

				this.$nextTick(() => {
					// Get transition
					if (transition === undefined && this.transitions.length > 0) {
						this.transition.last = this.transition.last + 1 >= this.transitions.length? 0 : this.transition.last + 1;

						transition = this.transitions[this.transition.last];
						this.transition.current = 'transition-'+ transition;
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
		img {
			position: absolute;
			visibility: hidden;
		}
	}

	.mask {
		position: relative;
		overflow: visible;
	}

#gallery.fullscreen {
	position:relative;
	top:0px;
	left:0px;
	width:100%;
	height:100%;
	background-color:black;
	z-index:10;
}

#page_body.view_gallery #gallery.presentation {
	width:673px;
	height:444px;
}

#page_body.view_gallery #gallery.presentation .front_image, #page_body.view_gallery #gallery.presentation .rear_image {
	background-color:#0a0a0c;
}

#gallery.fullscreen div.controls {
	position:absolute;
	width:150px;
	height:100px;
	padding:10px 0px;
	bottom:0px;
	left:0px;
	text-align:center;
	background-color:pink;
}

#gallery.fullscreen ul.pagination {
	position:absolute;
	width:100%;
	padding:10px 0px;
	bottom:0px;
	right:0px;
	text-align:center;
	background-color:#15171e;
}

#gallery.fullscreen ul.pagination li {
	margin:0px 5px;
	padding:1px;
	height:86px;
	border:1px solid #aaa;
	opacity:0.6;
}

#gallery.fullscreen ul.pagination li:hover { opacity:1; }

#gallery.fullscreen ul.pagination li.current {
	border:1px solid white;
	opacity:1;
}


</style>
