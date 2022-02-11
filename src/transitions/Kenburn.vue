<template>
	<flux-image
		ref="image"
		:image="from"
		:size="size"
		:css="css"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionKenburn',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1500,
			easing: 'linear',
			transform: {},
			css: {},
		}),

		created() {
			this.transform = this.getTransform();
			this.css.transformOrigin = this.transform.originX +' '+ this.transform.originY;
		},

		played() {
			this.$refs.image.transform({
				transition: `all ${this.totalDuration}ms ${this.easing}`,
				transform: `scale(${this.transform.scale}) translate(${this.transform.translateX}, ${this.transform.translateY})`,
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
