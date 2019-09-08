<template>
	<flux-image
		ref="from"
		:image="to"
		:size="size"
		:css="imageCss"
		@ready="ready"
	/>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionFade',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			totalDuration: 1200,
			easing: 'ease-in',
			imageCss: {
				zIndex: 1,
				opacity: 0
			},
		}),

		methods: {
			
			ready(){
				this.$emit('ready')
			},
			
			play(){
				// this.$nextTick( () => {
					const css = {
						transition: `opacity ${this.totalDuration}ms ${this.easing}`,
						opacity: 1,
					}
					this.imageCss = css 
				// })
			}, 
			
		},

		played() {

		},
	};
</script>
