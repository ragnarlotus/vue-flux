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
		name: 'TransitionWarp',

		components: {
			FluxVortex,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			circles: 7,
			tileDuration: 800,
			totalDuration: 0,
			easing: 'linear',
			tileDelay: 150,
		}),

		created() {
			this.totalDuration = this.tileDelay * this.circles + this.tileDuration;
		},

		played() {
			this.$refs.vortex.transform((circle, i) => {
				circle.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: `rotateZ(${this.getDeg(i)}deg)`,
				});
			});
		},

		methods: {
			getDelay(i) {
				return i * this.tileDelay;
			},

			getDeg(i) {
				return i % 2 === 0? '-90' : '90';
			},
		},
	};
</script>
