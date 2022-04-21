<script setup>
	import { ref, reactive } from 'vue';
	import usePartials, { baseProps } from '@/models/partials/transition.js';
	import FluxImage from '@/components/FluxImage.vue';

	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1600,
		easing: 'ease-in',
		style: {
			transformOrigin: 'center bottom',
		},
	});

	usePartials(props.options, conf);

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const onPlay = () => {
		$image.transform({
			transition: `transform ${conf.totalDuration}ms ${conf.easing}`,
			transform: 'rotateX(-83deg)',
		});
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxImage
		ref="$image"
		:rsc="from"
		:size="size"
		:style="conf.style"
	/>
</template>
