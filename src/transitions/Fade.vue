<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxImage from '@/components/FluxImage.vue';

	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1200,
		easing: 'ease-in',
		imageCss: {
			zIndex: 1,
		},
	});

	usePartials(props.options, conf);

	const onPlay = () => {
		$image.transform({
			transition: `opacity ${props.totalDuration}ms ${props.easing}`,
			opacity: 0,
		});
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxImage
		ref="$image"
		:rsc="from"
		:size="size"
		:css="conf.imageCss"
	/>
</template>
