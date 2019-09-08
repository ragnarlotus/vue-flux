<template>
	<div ref="wrapper" :style="wrapperCss" class="wrapper">
		<flux-image
			ref="left"
			:image="from"
			:size="size"
			:css="leftCss"
			@ready="ready"

		/>
		<flux-image
			ref="right"
			:image="to"
			:size="size"
			:css="rightCss"
			@ready="ready"

		/>
	</div>
</template>

<script>
	import BaseTransition from '@/mixins/BaseTransition.js';
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'TransitionSlide',

		components: {
			FluxImage,
		},

		mixins: [
			BaseTransition,
		],

		data: () => ({
			readyNum: 0,
			totalDuration: 1400,
			easing: 'ease-in-out',
			wrapperCss: {
				width: '200%',

			},
			leftCss: {
				width: '50%',
			},
			rightCss: {
				left: 'auto',
				right: 0,
				width: '50%',
			},
		}),
		
		methods: {
			
			ready(){
				this.readyNum++
				if (this.readyNum == 2)
				this.$emit('ready')
			},
			
			play(){
				const css = {
					width: '200%',
					visibility: 'visible',
					transition: `transform ${this.totalDuration}ms ${this.easing}`,
					transform: `translate3d(${-this.size.width}px,0,0)`,
				}
				
				this.$set(this, 'wrapperCss', css)
				
				// this.wrapperCss = css 
				// this.$refs.wrapper.transform({
				// 	transition: `transform ${this.totalDuration}ms ${this.easing}`,
				// 	transform: `translate3d(${-this.size.width}px,0,0)`,
				// });
			}, 
			
		}, 

		played() {

		},
	};
</script>

<style scoped>
	
	.wrapper {
		overflow: 'hidden';
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: hidden;

	}
	
</style>