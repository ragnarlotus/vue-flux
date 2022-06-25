<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxImage from '@/components/FluxImage.vue';

	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1200,
		easing: 'ease-in',
	});

	useTransitionMixin(props.options, conf);

	const imageCss = {
		zIndex: 1,
	};

	const onPlay = () => {
		$image.value.transform({
			transition: `opacity ${conf.totalDuration}ms ${conf.easing}`,
			opacity: 0,
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxImage
		ref="$image"
		:rsc="from"
		:size="size"
		:css="imageCss"
	/>
</template>
