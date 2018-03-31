<template>
	<div :style="style"></div>
</template>

<script>
	export default {
		name: 'VueFluxTile',

		data: () => ({
			style: {},
		}),

		props: {
			css: Object
		},

		created() {
			this.style = Object.assign({}, this.css);
		}
	};
</script>

<style lang="scss" scoped>
	
</style>
