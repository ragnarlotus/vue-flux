<template>
	<div v-if="display" class="flux-index">
		<transition name="fade">
			<button v-if="displayButton" @click="toggle">
				<svg class="toggle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<rect fill="white" x="15" y="15" width="14" height="14" />
					<rect fill="white" x="43" y="15" width="14" height="14" />
					<rect fill="white" x="71" y="15" width="14" height="14" />
					<rect fill="white" x="15" y="43" width="14" height="14" />
					<rect fill="white" x="43" y="43" width="14" height="14" />
					<rect fill="white" x="71" y="43" width="14" height="14" />
					<rect fill="white" x="15" y="71" width="14" height="14" />
					<rect fill="white" x="43" y="71" width="14" height="14" />
					<rect fill="white" x="71" y="71" width="14" height="14" />
				</svg>
			</button>
		</transition>

		<nav :class="listClass" @click="click" @touchstart.passive="touchStart" @touchend.passive="touchEnd">
			<ul ref="thumbs">
				<li v-for="(image, index) in images" :key="index" :class="current(index)" @click="click($event, index)">
					<flux-thumb :image="images[index]" :description="getCaptionText(index)" />
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';
	import FluxThumb from '@/components/FluxThumb.vue';

	export default {
		name: 'FluxIndex',

		components: {
			FluxThumb,
		},

		mixins: [
			BaseComplement,
		],

		data: () => ({
			visible: false,
			delay: 500,
			touchStartTime: 0,
		}),

		computed: {
			images() {
				if (!this.vf)
					return [];

				return this.vf.Images.props;
			},

			display() {
				return this.vf && this.vf.loaded;
			},

			displayButton() {
				return this.vf.mouseOver;
			},

			listClass() {
				let listClass = '';

				if (this.visible)
					listClass += 'visible';

				if (this.vf.mouseOver)
					listClass += ' mouse-over';

				return listClass;
			},
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
				this.visible? this.hide() : this.show();
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
				if (this.visible) {
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

					if (index !== undefined)
						this.showImage(index);
				}, this.delay);
			},

			current(index) {
				return this.currentImageIndex === index? 'current' : '';
			},
		},
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
		$smSize: $size * 0.55;
		$mdSize: $size * 0.70;
		$lgSize: $size * 0.85;

		.toggle {
			position: absolute;
			left: 50%;
			bottom: 70px;
			padding: 14px;
			margin-left: -($size / 2);
			width: $size;
			height: $size;
			cursor: pointer;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.6);
			z-index: 101;

			@media (max-width: 576px) {
				width: $smSize;
				height: $smSize;
				margin-left: -($smSize / 2);
				background-size: 31%;
			}

			@media (min-width: 577px) and (max-width: 768px) {
				width: $mdSize;
				height: $mdSize;
				margin-left: -($mdSize / 2);
				background-size: 34%;
			}

			@media (min-width: 769px) and (max-width: 992px) {
				width: $lgSize;
				height: $lgSize;
				margin-left: -($lgSize / 2);
				background-size: 37%;
			}
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

		$width: 160px;
		$height: 90px;

		li {
			position: relative;
			display: inline-block;
			box-sizing: content-box;
			margin: 8px 8px;
			width: $width;
			height: $height;
			cursor: pointer;
			transition: all 0.3s ease;

			@media (max-width: 386px) {
				width: $width * 0.5;
				height: $height * 0.5;
			}

			@media (min-width: 387px) and (max-width: 576px) {
				width: $width * 0.7;
				height: $height * 0.7;
			}
		}

		li:hover {
			box-shadow: 0px 0px 3px 2px rgba(255,255,255,0.6);
		}

		li.current {
			cursor: auto;
			border: 1px solid white;
			box-shadow: none;
		}
	}
</style>
