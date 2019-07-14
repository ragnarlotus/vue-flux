<template>
	<div class="preloader">
		<slot name="spinner">
			<div v-if="displaySpinner" class="spinner">
				<div class="pct">{{ vf.Images.progress }}%</div>
				<div class="border" />
			</div>
		</slot>

		<flux-image
			v-if="displayLast"
			:size="vf.size"
			:image="vf.Images.lastShown"
			:css="lastShownCss" />

		<flux-transition
			v-if="displayTransition"
			:size="vf.size"
			:transition="transitionName"
			:from="vf.Images.lastShown"
			:to="vf.Images.current"
			ref="transition" />
	</div>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';
	import FluxImage from '@/components/FluxImage.vue';
	import FluxTransition from '@/components/FluxTransition.vue';

	let Images, Transitions;

	export default {
		name: 'FluxPreloader',

		components: {
			FluxTransition,
			FluxImage,
		},

		mixins: [
			BaseComplement,
		],

		data: () => ({
			displayTransition: false,
			transitionName: undefined,
			lastShownCss: {
				zIndex: 13,
			},
		}),

		props: {
			spinner: {
				type: Boolean,
				default: true,
			},

			transition: String,
		},

		computed: {
			display() {
				return this.vf? true : false;
			},

			displaySpinner() {
				return this.vf.Images.preloading;
			},

			displayLast() {
				if (Images.lastShown && Images.preloading)
					return true;

				return false;
			},
		},

		watch: {
			'vf.Images.preloading': function(preloading) {
				if (!preloading && Images.props[0] && Images.lastShown.src !== Images.props[0].src)
					this.transitionStart();
			},
		},

		created() {
			Images = this.vf.Images;
			Transitions = this.vf.Transitions;
		},

		methods: {
			transitionStart() {
				if (!Images.current)
					return;

				this.transitionName = this.transition || Transitions.transitions[Transitions.nextIndex];
				this.displayTransition = true;

				this.$nextTick(() => {
					let timeout = this.$refs.transition.getDuration();

					setTimeout(() => {
						this.transitionEnd();
					}, timeout);
				});
			},

			transitionEnd() {
				if (!this.transition)
					Transitions.lastIndex = Transitions.nextIndex;

				this.transitionName = undefined;
				this.displayTransition = false;
				Images.updateLastShown(Images.current);
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
