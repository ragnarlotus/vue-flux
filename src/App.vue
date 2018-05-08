<template>
	<div id="app">
		<vue-flux
			:options="fluxOptions"
			:images="fluxImages"
			:transitions="fluxTransitions"
			ref="slider">
		</vue-flux>

		<button @click="$refs.slider.showImage('next')">NEXT</button>
	</div>
</template>

<script>
	import VueFlux from './components/VueFlux.vue';
	import Transitions from './components/transitions/index.js';

	export default {
		name: 'app',

		components: {
			VueFlux
		},

		data: () => ({
			fluxOptions: {
			},
			fluxImages: [
				'/static/slides/1.jpg',
				'/static/slides/2.jpg',
				'/static/slides/3.jpg'
			],
			fluxTransitions: {
				transitionSlide3d: Transitions.transitionSlide3d
			}
		})
	}
</script>

<style lang="scss" scoped>
	.vue-flux {
		width: 750px;
	}
</style>
