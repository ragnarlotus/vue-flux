<template>
	<flux-vortex
		ref="vortex"
		:size="size"
		:circles="circles"
		:image="from"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxVortex from '@/components/FluxVortex.vue';

	export default {
		name: 'TransitionCamera',

		components: {
			FluxVortex,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			circles: 7,
			tileDuration: 400,
			totalDuration: 0,
			easing: 'ease',
			tileDelay: 80,
		}),

		created() {
			this.totalDuration = this.tileDelay * this.circles + this.tileDuration;
		},

		mounted() {
			this.$refs.vortex.transform((circle, i) => {
				circle.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: 'scale(0, 0)',
				});
			});
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},
		},
	};
</script>
