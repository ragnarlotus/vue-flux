<template>
	<div :style="css" class="wrapper" ref="wrapper">
		<slot />
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxWrapper',

		mixins: [
		BaseComponent,
		],
		
		props: {
			
			css : {
				type: Object,
				default: {}
			}
			
		},

		data: () => ({
			baseStyle: {
			},
		}),
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

}
</style>