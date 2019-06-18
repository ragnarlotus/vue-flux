<template>
	<div v-if="display" class="preloader">
		<slot name="spinner">
			<div v-if="showSpinner" class="spinner">
				<div class="pct">{{ loadPct }}%</div>
				<div class="border"></div>
			</div>
		</slot>

		<flux-image
			v-if="vf.Images.lastShown"
			:size="vf.size"
			:image="vf.Images.lastShown"
			:css="lastShown.css"
			ref="lastShown">
		</flux-image>

		<flux-transition
			v-if="!vf.Images.preloading"
			:size="vf.size"
			:transition="runningTransition"
			:from="vf.Images.lastShown"
			:to="vf.Images.current"
			:options="vf.Transitions.options"
			ref="transition"
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
			runningTransition: undefined,

			lastShown: {
				css: {
					zIndex: 13,
				},
			},
		}),

		props: {
			slider: VueFlux,

			showSpinner: {
				type: Boolean,
				default: true,
			},

			transition: String
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

				if (!this.vf.Images.preloading && !this.runningTransition)
					return false;

				return true;
			},

			loadPct: function() {
				if (this.vf === undefined)
					return 0;

				let loading = this.vf.Images.loading.length;
				let loaded = this.vf.Images.props.length;

				return Math.ceil(loaded * 100 / loading) || 0;
			},
		},

		watch: {
			'vf.Images.preloading': function(preloading) {
				if (preloading || !vf.Images.lastShown)
					return;

				this.transitionStart();
			}
		},

		methods: {
			transitionStart() {
				let Transitions = this.vf.Transitions;

				this.runningTransition = this.transition || Transitions.transitions[Transitions.nextIndex];

				let timeout = vf.$refs.transition.getDuration();

				setTimeout(() => {
					this.transitionEnd();
				}, timeout);
			},

			transitionEnd() {
				let Transitions = this.vf.Transitions;

				if (!this.transition)
					Transitions.lastIndex = Transitions.nextIndex;

				this.runningTransition = undefined;
			}
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
