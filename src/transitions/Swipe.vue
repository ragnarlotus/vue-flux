<script setup>
	import { ref, reactive } from 'vue';
	import usePartials, { baseProps } from '@/models/partials/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
		wrapperCss: {
			position: 'absolute',
			top: 0,
			display: 'flex',
			flexWrap: 'nowrap',
		},
		imageCss: {
			flex: '0 0 auto',
		},
	});

	usePartials(props.options, conf);

	const setup = {
		prev: () => {
			Object.assign(conf.wrapperCss, {
				right: 0,
				justifyContent: 'flex-end',
			});
		},

		next: () => {
			Object.assign(conf.wrapperCss, {
				left: 0,
				justifyContent: 'flex-start',
			});
		},
	};

	setup[conf.direction]();

	const onPlay = () => {
		$wrapper.transform({
			transition: `width ${conf.totalDuration}ms ${conf.easing}`,
			width: 0,
		});
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxWrapper ref="$wrapper" :size="size" :css="conf.wrapperCss">
		<FluxImage
			ref="$image"
			:rsc="from"
			:size="size"
			:css="conf.imageCss"
		/>
	</FluxWrapper>
</template>
