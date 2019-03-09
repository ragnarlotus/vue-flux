<template>
	<div class="flux-index">
		<transition name="fade">
			<div v-show="displayButton" class="toggle" @click="toggle"></div>
		</transition>

		<nav :class="indexClass" @click="click" @touchstart.passive="touchStart" @touchend.passive="touchEnd">
			<ul ref="thumbs">
				<li v-for="(image, index) in images" :key="index" :class="current(index)" @click="click($event, index)">
					<flux-thumb :slider="vf" :index="index"></flux-thumb>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import FluxThumb from '@/components/FluxThumb.vue';

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
			slider: {
				type: Object
			}
		},

		computed: {
			vf: function() {
				if (this.slider)
					return this.slider;

				if (this.$parent.$options.name === 'VueFlux')
					return this.$parent.loaded? this.$parent : undefined;

				console.warn('slider not referenced, check https://github.com/deulos/vue-flux/wiki/FluxIndex for help');

				return undefined;
			},

			images: function() {
				if (!this.vf)
					return [];

				return this.vf.properties;
			},

			displayButton: function() {
				if (!this.vf)
					return false;

				if (!this.vf.index)
					return false;

				if (this.vf.mouseOver === false)
					return false;

				if (this.vf.transition.current !== undefined)
					return false;

				return true;
			},

			indexClass: function() {
				if (!this.vf)
					return '';

				let indexClass = '';

				if (this.visible && this.vf.index)
					indexClass += 'visible';

				if (this.vf.mouseOver)
					indexClass += ' mouse-over';

				return indexClass;
			}
		},

		methods: {
			touchStart(event) {
				if (!this.vf.config.enableGestures)
					return;

				event.stopPropagation();

				this.touchStartTime = Date.now();
			},

			touchEnd(event) {
				if (!this.vf.config.enableGestures)
					return;

				event.stopPropagation();

				let offsetTime = Date.now() - this.touchStartTime;

				if (offsetTime < 100)
					this.toggle();
			},

			click(event, index) {
				event.stopPropagation();

				if (index === undefined)
					this.toggle();

				else
					this.showImage(index);
			},

			toggle() {
				if (!this.vf.index)
					return;

				if (!this.visible)
					this.show();

				else
					this.hide();
			},

			show() {
				this.vf.stop();
				this.visible = true;

				this.$nextTick(() => {
					this.$refs.thumbs.clientHeight;
					this.$refs.thumbs.style.marginTop = 0;
				});
			},

			showImage(index) {
				if (this.vf.index && this.visible) {
					this.hide(index);
					return;
				}

				this.vf.showImage(index);
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
				return this.vf.currentImage().index === index? 'current' : '';
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

		$size: 50px;

		.toggle {
			position: absolute;
			left: 50%;
			bottom: 55px;
			margin-left: -($size / 2);
			width: $size;
			height: $size;
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

		@media (max-width: 576px) {
			$smSize: $size * 0.55;

			.toggle {
				width: $smSize;
				height: $smSize;
				margin-left: -($smSize / 2);
				background-size: 31%;
			}
		}

		@media (min-width: 577px) and (max-width: 768px) {
			$mdSize: $size * 0.70;

			.toggle {
				width: $mdSize;
				height: $mdSize;
				margin-left: -($mdSize / 2);
				background-size: 34%;
			}
		}

		@media (min-width: 769px) and (max-width: 992px) {
			$lgSize: $size * 0.85;

			.toggle {
				width: $lgSize;
				height: $lgSize;
				margin-left: -($lgSize / 2);
				background-size: 37%;
			}
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
