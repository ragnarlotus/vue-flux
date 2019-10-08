<template>
	<flux-image
		ref="image"
		:image="from"
		:size="size"
		:style="style"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionFall',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1600,
			easing: 'ease-in',
			style: {
				transformOrigin: 'center bottom',
			},
		}),

		created() {
			Object.assign(this.mask, {
				perspective: '1600px',
				overflow: 'visible',
			});
		},

		played() {
			this.$refs.image.transform({
				transition: `transform ${this.totalDuration}ms ${this.easing}`,
				transform: 'rotateX(-83deg)',
			});
		},
	};
</script>
