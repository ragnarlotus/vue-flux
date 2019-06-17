<template>
	<div v-if="display" class="preloader">
		<slot name="spinner">
			<div v-if="showSpinner" class="spinner">
				<div class="pct">{{ loadPct }}%</div>
				<div class="border"></div>
			</div>
		</slot>

		<flux-image
			:size="vf.size"
			:image="currentImage"
			:color="currentImage.color"
			:css="currentImage.css"
			ref="currentImage">
		</flux-image>

		<flux-transition
			:size="vf.size"
			:transition="vf.Transitions.current"
			:from="currentImage"
			:to="nextImage"
			:options="vf.Transitions.options"
		></flux-transition>
	</div>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';
	import FluxTransition from '@/components/FluxTransition.vue';
	import VueFlux from '@/components/VueFlux.vue';

	export default {
		name: 'FluxPreloader',

		components: {
			FluxTransition,
			FluxImage,
		},

		data: () => ({
			runningTransition: false,
			lastSrc: undefined,

			currentImage: {
				css: {
					zIndex: 13,
				},
			},

			nextImage: {
				css: {
					zIndex: 12,
				},
			},
		}),

		props: {
			slider: VueFlux,

			showSpinner: {
				type: Boolean,
				default: true,
			},
		},

		computed: {
			vf: function() {
				if (this.slider)
					return this.slider;

				if (this.$parent.$options.name === 'VueFlux')
					return this.$parent;

				throw new ReferenceError('slider not referenced, check https://github.com/deulos/vue-flux/wiki/FluxPreloader for help');

				return undefined;
			},

			display: function() {
				if (!this.vf)
					return false;

				if (this.runningTransition === false && this.vf.loaded === true)
					return false;

				return true;
			},

			loadPct: function() {
				if (this.vf === undefined)
					return 0;

				return Math.ceil(this.vf.Images.loaded * 100 / this.vf.Images.count) || 0;
			},
		},

		watch: {
			display: function() {
				if (this.display === true) {
					this.prepareImages();
				}
			},

			'vf.Images.current': function() {
				this.lastSrc = this.vf.Images.current.src;
			},
		},

		mounted() {
			this.prepareImages();
		},

		methods: {
			prepareImages() {
			},
		}
	};
</script>

<style lang="scss">
	.vue-flux .preloader {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 12;

		$spinner-size: 80px;

		.spinner {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -($spinner-size / 2);
			margin-left: -($spinner-size / 2);
			width: $spinner-size;
			height: $spinner-size;
			z-index: 14;

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
	}
</style>
