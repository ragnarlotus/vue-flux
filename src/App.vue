<template>
	<div id="app">
		<vue-flux :images="fluxImages"></vue-flux>
	</div>
</template>

<script>
import VueFlux from './components/VueFlux.vue';

export default {
	name: 'app',

	components: {
		VueFlux
	},

	data: () => ({
		fluxImages: [
			'/static/slides/1.jpg',
			'/static/slides/2.jpg',
			'/static/slides/3.jpg'
		]
	})
}
</script>

<style lang="scss" scoped>
	.vue-flux {
		width: 640px;
		height: 480px;
	}
</style>
