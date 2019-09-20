<template>
	<div class="preloader">
		<slot name="spinner">
			<div v-if="displaySpinner" class="spinner">
				<div class="pct">{{ Images.progress }}%</div>
				<div class="border" />
			</div>
		</slot>

		<flux-image
			v-if="displayLast"
			:size="vf.size"
			:image="Images.lastShown"
			:css="lastShownCss" />

		<flux-transition
			v-if="runTransition"
			:size="vf.size"
			:transition="runTransition"
			:from="Images.lastShown"
			:to="Images.current"
			@end="transitionEnd()"
			ref="transition" />
	</div>
</template>

<script>
	import BaseComplement from '@/mixins/BaseComplement.js';
	import FluxImage from '@/components/FluxImage.vue';
	import FluxTransition from '@/components/FluxTransition.vue';

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
			runTransition: undefined,
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
			displaySpinner() {
				return this.spinner && this.Images.preloading;
			},

			displayLast() {
				let { Images } = this;

				if (Images.preloading && Images.lastShown && Images.lastShown.src !== Images.props[0].src)
					return true;

				return false;
			},
		},

		watch: {
			'Images.preloading': function(preloading) {
				let { Images } = this;

				if (!preloading && Images.props[0] && Images.lastShown && Images.props[0].src !== Images.lastShown.src)
					this.transitionStart();
			},
		},

		methods: {
			transitionStart() {
				if (!this.Images.current)
					return;

				this.runTransition = this.transition || this.Transitions.next.name;
			},

			transitionEnd() {
				if (!this.transition)
					this.Transitions.last = this.Transitions.next;

				this.runTransition = undefined;
				this.Images.last = this.Images.current;
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
				box-sizing: border-box;
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
