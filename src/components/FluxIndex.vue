<template>
	<div v-if="slider !== undefined && slider.loaded" class="flux-index">
		<transition name="fade">
			<div v-if="displayButton" class="toggle" @click="toggle()"></div>
		</transition>

		<nav :class="indexClass" @click="click" @touchstart="touchStart" @touchend="touchEnd">
			<ul ref="thumbs">
				<li v-for="(image, index) in images" :key="index" :class="current(index)" @click="click(index)" @touchstart="touchStart($event, index)" @touchend="touchEnd($event, index)">
					<flux-thumb :slider="slider" :index="index"></flux-thumb>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import FluxThumb from './FluxThumb.vue';

	export default {
		name: 'FluxIndex',

		components: {
			FluxThumb
		},

		data: () => ({
			visible: false,
			delay: 500,
			touchStartTime: 0
		}),

		props: {
			slider: { type: Object, required: false }
		},

		computed: {
			images: function() {
				return this.slider.properties;
			},

			displayButton: function() {
				if (!this.slider.index)
					return false;

				if (this.slider.mouseOver !== true)
					return false;

				if (this.slider.transition.current !== undefined)
					return false;

				if (this.visible === true)
					return false;

				return true;
			},

			indexClass: function() {
				let indexClass = '';

				if (this.visible && this.slider.index)
					indexClass += 'visible';

				if (this.slider.mouseOver)
					indexClass += ' mouse-over';

				return indexClass;
			}
		},

		methods: {
			touchStart(event) {
				event.stopPropagation();
				this.touchStartTime = Date.now();
			},

			touchEnd(event, index) {
				event.stopPropagation();
				let offsetTime = Date.now() - this.touchStartTime;

				if (offsetTime > 200)
					return;

				if (typeof index === 'undefined')
					this.toggle();

				else
					this.showImage(index);
			},

			click(index) {
				if (this.slider.touchable)
					return;

				if (typeof index === 'undefined')
					this.toggle();

				else
					this.showImage(index);
			},

			toggle() {
				if (!this.slider.index)
					return;

				if (!this.visible)
					this.show();

				else
					this.hide();
			},

			show() {
				this.slider.stop();
				this.visible = true;

				this.$nextTick(() => {
					this.$refs.thumbs.clientHeight;
					this.$refs.thumbs.style.marginTop = 0;
				});
			},

			showImage(index) {
				if (this.slider.index && this.visible) {
					this.hide(index);
					return;
				}

				this.slider.mouseOver = false;
				this.slider.showImage(index);
			},

			hide(index) {
				this.$refs.thumbs.clientHeight;
				this.$refs.thumbs.style.marginTop = '100%';

				setTimeout(() => {
					this.visible = false;

					if (typeof index !== 'undefined')
						this.showImage(index);
				}, this.delay);
			},

			current(index) {
				return this.slider.currentImage.index === index? 'current' : '';
			}
		}
	};
</script>

<style lang="scss">
	.vue-flux .flux-index {
		.fade-enter, .fade-leave-to {
			opacity: 0;
		}

		.fade-enter-active, .fade-leave-active {
			transition: opacity 0.3s ease-in;
		}

		.toggle {
			position: absolute;
			left: 50%;
			bottom: 55px;
			margin-left: -25px;
			width: 50px;
			height: 50px;
			cursor: pointer;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.6);
			background-repeat: no-repeat;
			background-position: center center;
			background-size: 40%;
			background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAA6ElEQVRYhe2ZUQ2DMBRFK6ESkFAJSEBCJSABB0iYBCRUAlKQcPexLtlHW+4Ly7Ju9yTvj3ffCQktUAdgBZCIurkCADyAjcyIlYxI9icAwcHGWBi4GPqPinQyZCyfloakSSQt6QaSlnSDUBgYDf17RXozZMwOwIjH3TqrqTQwD53JjKHS78n+ueYgRPfkh/GsfKN/YDJOHAKRMTwv3sml5iiJ5zCWtSK8GjKmv9hcJC3pBpKWdANJX5Hub0d8GdzPu4cQvwZ6/Bo3LDXAF/33sDAWBmpHJJA0haRJJC3pBlel33Zi293Z+B2f9cNhdwgb0QAAAABJRU5ErkJggg==');
			z-index: 101;
		}

		.toggle:hover {
			transition: background-color 0.2s ease-in;
			background-color: rgba(0, 0, 0, 0.9);
		}

		nav {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: block;
			margin: 0;
			overflow: hidden;
			visibility: hidden;
		}

		nav.visible {
			z-index: 101;
			visibility: visible;
		}

		ul {
			display: block;
			height: 100%;
			margin: 0;
			margin-top: 100%;
			padding: 18px 10px;
			list-style-type: none;
			text-align: center;
			overflow-y: auto;
			background-color: rgba(0, 0, 0, 0.8);
			transition: all 0.5s linear;
		}

		li {
			position: relative;
			display: inline-block;
			margin: 8px 8px;
			cursor: pointer;
			transition: all 0.3s ease;
		}

		.mouse-over li:hover {
			box-shadow: 0px 0px 3px 2px rgba(255,255,255,0.6);
		}

		li.current {
			cursor: auto;
			border: 1px solid white;
			box-shadow: none;
		}

		ul > li:last-child {
			margin-bottom: 26px;
		}
	}
</style>
