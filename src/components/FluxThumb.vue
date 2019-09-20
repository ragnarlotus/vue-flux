<template>
	<flux-image
		ref="thumb"
		:title="description"
		:image="image"
		:size="size"
	/>
</template>

<script>
	import FluxImage from '@/components/FluxImage.vue';

	export default {
		name: 'FluxThumb',

		components: {
			FluxImage,
		},

		props: {
			size: Object,

			image: [ String, Object ],

			description: String,
		},
	};
</script>
