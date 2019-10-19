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
		name: 'TransitionConcentric',

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
			let deg = this.direction === 'next'? '90' : '-90';

			this.$refs.vortex.transform((tile, i) => {
				tile.transform({
					transition: `all ${this.tileDuration}ms ${this.easing} ${this.getDelay(i)}ms`,
					opacity: '0',
					transform: `rotateZ(${deg}deg)`,
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
