<template>
	<div
		ref="container"
		class="vue-flux"
		:style="style"
		@mousemove="toggleMouseOver(true)"
		@mouseleave="toggleMouseOver(false)"
		@dblclick="toggleFullScreen()"
		@touchstart="Touches.start($event)"
		@touchend="Touches.end($event)"
	>
		<img
			v-for="(url, index) in Images.loading"
			:key="index"
			v-if="Images.loading[index]"
			:src="config.path + url"
			:time="Images.time"
			@load="Images.addProperties(index, $event)"
			@error="Images.addProperties(index, $event)"
		/>

		<flux-transition
			ref="transition"
			v-if="Transitions.current"
			:transition="Transitions.current"
			:size="size"
			:from="Transitions.from"
			:to="Transitions.to"
			@start="Transitions.start()"
			@end="Transitions.end()"
		/>

		<flux-image
			ref="image"
			:size="size"
			:image="Images.current"
		/>

		<slot v-if="size.height" name="preloader" />

		<slot v-if="size.height" name="caption" />

		<slot v-if="size.height" name="controls" />

		<slot v-if="size.height" name="index" />

		<slot v-if="loaded && size.height" name="pagination" />
	</div>
</template>

<script type="module">
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

	export default {
		name: 'VueFlux',

		components: {
			FluxImage,
			FluxTransition,
		},

		data: () => ({
			config: {
				allowFullscreen: false,
				allowToSkipTransition: true,
				autohideTime: 1500,
				autoplay: false,
				bindKeys: false,
				delay: 5000,
				enableGestures: false,
				infinite: true,
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

				if (this.Display.inFullScreen()) {
					return {
						width: '100% !important',
						height: '100% !important',
					};
				}

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

				this.Transitions.update();

				wasPlaying && this.start();
			},

			images() {
				let wasPlaying = this.config.autoplay;

				this.stop();

				this.$nextTick(() => {
					this.Images.load(this.images);

					this.config.autoplay = wasPlaying;
				});
			},
		},

		created() {
			this.Display = new DisplayController(this);
			this.Timers = new TimersController(this);
			this.Images = new ImagesController(this);
			this.Touches = new TouchesController(this);
			this.Transitions = new TransitionsController(this);

			this.updateOptions();
			this.Transitions.update();

			this.$emit('created');
		},

		mounted() {
			this.resize();

			this.Images.load(this.images);

			this.$emit('mounted');
		},

		beforeDestroy() {
			window.removeEventListener('resize', this.resize);
			window.removeEventListener('keydown', this.keydown);

			this.Timers.clear();

			this.$emit('destroyed');
		},

		methods: {
			updateOptions() {
				Object.assign(this.config, this.options);

				if (this.config.autohideTime === 0)
					this.mouseOver = true;

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

			resize() {
				this.size = {};

				this.$nextTick(() => {
					let size = DomHelper.sizeFrom(this.$refs.container);

					if (!size.height)
						size.height = size.width / 16 * 9;

					this.size = size;
				});
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

			enterFullScreen() {
				if (this.config.allowFullscreen === false)
					return;

				this.Display.requestFullScreen(this.$refs.container);
			},

			exitFullScreen() {
				this.Display.exitFullScreen();
			},

			toggleFullScreen() {
				this.Display.inFullScreen()? this.exitFullScreen() : this.enterFullScreen();
			},

			play(index = 'next', delay) {
				this.config.autoplay = true;

				this.Timers.set('image', delay || this.config.delay, () => {
					this.show(index);
				});

				this.$emit('play');
			},

			stop() {
				this.config.autoplay = false;

				this.Timers.clear('image');

				this.$emit('stop');
			},

			show(index, transition) {
				if (this.loaded === false || this.$refs.image === undefined)
					return;

				if (this.Transitions.current !== undefined) {
					if (this.config.allowToSkipTransition) {
						this.Transitions.cancel();

						this.$nextTick(() => this.show(index, transition));
					}

					return;
				}

				index = this.Images.getIndex(index);

				let from = { ...this.Images.current };
				let to = { ...this.Images.props[index] };

				this.Transitions.run(transition, from, to);

				this.$emit('show');
			},

			keydown(event) {
				if (/ArrowLeft|Left/.test(event.key))
					this.show('previous');

				else if (/ArrowRight|Right/.test(event.key))
					this.show('next');
			},
		},
	};
</script>

<style lang="scss">
	.vue-flux {
		position: relative;

		& > img {
			position: absolute;
			visibility: hidden;
		}
	}
</style>
