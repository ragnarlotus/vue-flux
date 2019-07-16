<template>
	<div :style="style" ref="wrapper">
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

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
			},
		}),
	};
</script>
