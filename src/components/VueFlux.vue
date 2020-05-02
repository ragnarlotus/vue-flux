<template>
	<div
		ref="container"
		class="vue-flux"
		:style="style"
		@mousemove="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="Display.toggleFullScreen()"
		@touchstart="Touches.start($event)"
		@touchend="Touches.end($event)"
	>
		<flux-transition
			v-if="Transitions.current"
			ref="transition"
			:transition="Transitions.current"
			:size="size"
			:from="Transitions.from"
			:to="Transitions.to"
			:current="$refs.image"
			:options="Transitions.current.options"
			:images="Images.imgs"
			@ready="Transitions.ready()"
			@start="Transitions.start()"
			@end="Transitions.end()"
		/>

		<flux-image
			v-if="Images.current"
			ref="image"
			:size="size"
			:image="Images.current"
		/>

		<div v-if="size" class="complements">
			<slot name="preloader" />
			<slot name="caption" />
			<div style="height: 48%;" />
			<slot name="controls" />
			<slot name="index" />
			<slot v-if="loaded" name="pagination" />
		</div>
	</div>
</template>

<script type="module">
	// Libraries
	import Dom from '@/libraries/Dom.js';

	// Controllers
	import DisplayController from '@/controllers/Display.js';
	import TimersController from '@/controllers/Timers.js';
	import TransitionsController from '@/controllers/Transitions.js';
	import ImagesController from '@/controllers/Images.js';
	import TouchesController from '@/controllers/Touches.js';

	// Components
	import FluxTransition from '@/components/FluxTransition.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'VueFlux',

		components: {
			FluxImage,
			FluxTransition,
		},

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

		data: () => ({
			config: {
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
			},
			size: undefined,
			loaded: false,
			mouseOver: false,
			Display: undefined,
			Timers: undefined,
			Transitions: undefined,
			Touches: undefined,
			Images: undefined,
		}),

		computed: {
			style() {
				if (!this.size)
					return {};

				if (this.Display.inFullScreen) {
					return {
						width: '100% !important',
						height: '100% !important',
					};
				}

				let { width, height } = this.size;

				return {
					width: width? width +'px' : 'auto',
					height: height? height +'px' : 'auto',
				};
			},
		},

		watch: {
			options: {
				handler() {
					this.updateOptions();
				},
				deep: true,
			},

			transitions() {
				let wasPlaying = this.config.autoplay;

				this.stop(true);

				this.Transitions.update(this.transitions);
				wasPlaying && this.play();
			},

			images() {
				let wasPlaying = this.config.autoplay;

				this.stop(true);
				this.loaded = false;

				this.Images.update(this.images);
				wasPlaying && this.play();
			},
		},

		created() {
			this.Display = new DisplayController(this);
			this.Timers = new TimersController(this);
			this.Images = new ImagesController(this);
			this.Touches = new TouchesController(this);
			this.Transitions = new TransitionsController(this);

			this.updateOptions();

			this.$emit('created');
		},

		mounted() {
			this.resize();

			this.Images.update(this.images);
			this.Transitions.update(this.transitions);

			this.$emit('mounted');
		},

		beforeDestroy() {
			this.removeListeners();

			this.Timers.clear();

			this.$emit('destroyed');
		},

		methods: {
			updateOptions() {
				Object.assign(this.config, this.options);

				if (this.config.autohideTime === 0)
					this.mouseOver = true;

				this.removeListeners();

				window.addEventListener('resize', this.resize, {
					passive: true,
				});

				if (this.config.bindKeys) {
					window.addEventListener('keydown', this.keydown, {
						passive: true,
					});
				}

				this.$emit('options-updated');
			},

			async resize() {
				if (!this.$refs.container)
					return;

				if (this.Transitions.current)
					this.Transitions.end(true);

				this.size = undefined;

				await this.$nextTick();

				let size = Dom.sizeFrom(this.$refs.container);

				if (!size.height) {
					const [ arWidth, arHeight ] = this.config.aspectRatio.split(':');
					size.height = size.width / arWidth * arHeight;
				}

				this.size = size;
			},

			init() {
				this.loaded = true;

				if (this.config.autoplay === true)
					this.play();

				this.$emit('ready');
			},

			toggleMouseOver(over) {
				if (this.config.autohideTime === 0)
					return;

				this.Timers.clear('mouseOver');

				this.mouseOver = over;

				if (this.mouseOver) {
					this.Timers.set('mouseOver', this.config.autohideTime, () => {
						this.mouseOver = false;
					});

				} else {
					this.mouseOver = false;
					this.Timers.clear('mouseOver');
				}
			},

			toggleFullScreen() {
				this.Display.toggleFullScreen();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				if (!this.Transitions.current) {
					this.Timers.set('transition', delay || this.config.delay, () => {
						this.show(index);
					});
				}

				this.$emit('play', {
					index,
				});
			},

			stop(cancelTransition) {
				this.config.autoplay = false;

				this.Timers.clear('transition');

				if (this.Transitions.current && cancelTransition)
					this.Transitions.end(true);

				this.$emit('stop');
			},

			show(index = 'next', transition) {
				if (!this.loaded || !this.$refs.image)
					return;

				if (this.Transitions.current) {
					if (this.config.allowToSkipTransition) {
						this.Transitions.end(true);

						this.$nextTick(() => {
							this.show(index, transition);
						});
					}

					return;
				}

				let from = this.Images.current;
				let to = this.Images.getByIndex(index);
				let direction = ['prev', 'next'].includes(index)? index : undefined;

				this.Transitions.run(transition, from, to, direction);

				this.$emit('show', {
					transition,
					from,
					to,
					direction,
				});
			},

			keydown(event) {
				if (/ArrowLeft|Left/.test(event.key))
					this.show('prev');

				else if (/ArrowRight|Right/.test(event.key))
					this.show('next');
			},

			removeListeners() {
				window.removeEventListener('resize', this.resize);
				window.removeEventListener('keydown', this.keydown);
			},
		},
	};
</script>

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
		}
	}
</style>
