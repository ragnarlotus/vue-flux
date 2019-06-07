<template>
	<flux-image :image="from" :size="size" ref="image"></flux-image>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'transitionKenburn',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1500,
			easing: 'linear',
			image: undefined,
		}),

		mounted() {
			let transform = this.getTransform();

			this.$refs.image.setCss({
				transformOrigin: transform.originX +' '+ transform.originY,
			});

			this.$refs.image.transform({
				transition: `all ${this.totalDuration}ms ${this.easing}`,
				transform: `scale(${transform.scale}) translate(${transform.translateX}, ${transform.translateY})`,
				opacity: 0,
			});
		},

		methods: {
			getTransform() {
				let origin = Math.floor((Math.random() * 4) + 1);

				if (origin === 1) {
					return {
						scale: '1.7',
						translateX: '-35%',
						translateY: '-35%',
						originX: 'top',
						originY: 'left',
					};
				}

				if (origin === 2) {
					return {
						scale: '1.7',
						translateX: '35%',
						translateY: '-35%',
						originX: 'top',
						originY: 'right',
					};
				}

				if (origin === 3) {
					return {
						scale: '1.7',
						translateX: '-35%',
						translateY: '35%',
						originX: 'bottom',
						originY: 'left',
					};
				}

				return {
					scale: '1.7',
					translateX: '35%',
					translateY: '35%',
					originX: 'bottom',
					originY: 'right',
				};
			},
		},
	};
</script>
