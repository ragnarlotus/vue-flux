<template>
	<flux-image
		:title="description"
		:image="image"
		:size="size"
		ref="thumb" />
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
