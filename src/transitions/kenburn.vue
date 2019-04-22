<template>
	<flux-image :image="image" :size="size" ref="image"></flux-image>
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

		created() {
			this.image = this.direction === 'left'? this.to : this.from;
			this.mask.overflow = 'hidden';
		},

		mounted() {
			let transform = this.getTransform();

			if (this.direction !== 'left')
				this.focusIn(transform);

			else
				this.focusOut(transform);
		},

		methods: {
			focusIn(transform) {
				this.$refs.image.setCss({
					transformOrigin: transform.originX +' '+ transform.originY,
				});

				this.$refs.image.transform({
					transition: 'all '+ this.totalDuration +'ms '+ this.easing,
					transform: 'scale('+ transform.scale +') translate('+ transform.translateX +', '+ transform.translateY +')',
					opacity: 0,
				});
			},

			focusOut(transform) {
				this.$refs.image.setCss({
					transform: 'scale('+ transform.scale +') translate('+ transform.translateX +', '+ transform.translateY +')',
					transformOrigin: transform.originX +' '+ transform.originY,
				});

				this.$refs.image.transform({
					transition: 'all '+ this.totalDuration +'ms '+ this.easing,
					transform: 'scale(1) translate(0, 0)',
				});
			},

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
