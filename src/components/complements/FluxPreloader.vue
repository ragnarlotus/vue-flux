<template>
	<div class="preloader">
		<slot name="spinner">
			<div v-if="displaySpinner" class="spinner">
				<div class="pct">
					{{ Images.progress }}%
				</div>
				<div class="border" />
			</div>
		</slot>

		<flux-image
			v-if="displayLast"
			:size="vf.size"
			:image="Images.last"
			:css="imageCss"
		/>

		<flux-transition
			v-if="transitionName"
			ref="transition"
			:size="vf.size"
			:transition="transitionName"
			:from="Images.last"
			:to="Images.current"
			@ready="$refs.transition.start()"
			@end="transitionEnd()"
		/>
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

		props: {
			spinner: {
				type: Boolean,
				default: true,
			},

			transition: String,
		},

		data: () => ({
			displayTransition: false,
			transitionName: undefined,
			imageCss: {
				zIndex: 13,
			},
		}),

		computed: {
			displaySpinner() {
				return this.spinner && this.vf.Images.preloading;
			},

			displayLast() {
				let { Images } = this;

				if (Images.preloading && Images.lastShown && Images.lastShown.src !== Images.imgs[0].src)
					return true;

				return false;
			},
		},

		watch: {
			'vf.Images.preloading': function(preloading) {
				let { Images } = this;

				if (!preloading && Images.imgs[0] && Images.lastShown && Images.lastShown.src !== Images.imgs[0].src)
					this.transitionStart();
			},
		},

		methods: {
			transitionStart() {
				let { Images, Transitions } = this;

				if (!Images.current)
					return;

				this.transitionName = this.transition || Transitions.next.name;
			},

			transitionEnd() {
				let { Images, Transitions } = this;

				if (!this.transition)
					Transitions.last = Transitions.next;

				this.transitionName = undefined;
				Images.last = Images.current;
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
		z-index: -1;

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
