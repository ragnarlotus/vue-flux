<template>
	<flux-wrapper ref="wrapper" :size="wrapperSize" :style="wrapperStyle">
		<flux-image
			ref="left"
			:image="left"
			:size="size"
		/>
		<flux-image
			ref="right"
			:image="right"
			:size="size"
		/>
	</flux-wrapper>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionSlide',

		components: {
			FluxWrapper,
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1400,
			easing: 'ease-in-out',
			left: undefined,
			right: undefined,
			wrapperSize: undefined,
			wrapperStyle: {
				display: 'flex',
				flexWrap: 'nowrap',
			},
		}),

		computed: {
			transition() {
				return `transform ${this.totalDuration}ms ${this.easing}`;
			},
		},

		created() {
			this.wrapperSize = {
				width: this.size.width * 2,
				height: this.size.height,
			};
		},

		methods: {
			setupPrev() {
				this.left = this.to;
				this.right = this.from;

				this.$refs.wrapper.setCss({
					transform: `translateX(-50%)`,
				});
			},

			setupNext() {
				this.left = this.from;
				this.right = this.to;
			},

			playPrev() {
				this.$refs.wrapper.transform({
					transition: this.transition,
					transform: `translateX(0)`,
				});
			},

			playNext() {
				this.$refs.wrapper.transform({
					transition: this.transition,
					transform: `translateX(-50%)`,
				});
			},
		}
	};
</script>
