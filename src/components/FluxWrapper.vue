<template>
	<div ref="wrapper" :style="style">
		<slot />
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent';

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
