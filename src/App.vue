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
				'/static/slides/6.jpg',
				'/static/slides/1.jpg',
				'/static/slides/5.jpg',
				'/static/slides/3.jpg',
				'/static/slides/4.jpg'
			],
			fluxTransitions: {
				transitionCamera: Transitions.transitionCamera
			}
		})
	}
</script>

<style lang="scss" scoped>
	.vue-flux {
		width: 750px;
	}
</style>
