<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransitionMixin(props.options, conf);

	const wrapperCss = {
		position: 'absolute',
		top: 0,
		display: 'flex',
		flexWrap: 'nowrap',
	};

	const imageCss = {
		flex: '0 0 auto',
	};

	const setup = {
		prev: () => {
			Object.assign(wrapperCss, {
				right: 0,
				justifyContent: 'flex-end',
			});
		},

		next: () => {
			Object.assign(wrapperCss, {
				left: 0,
				justifyContent: 'flex-start',
			});
		},
	};

	setup[conf.direction]();

	const onPlay = () => {
		$wrapper.value.transform({
			transition: `width ${conf.totalDuration}ms ${conf.easing}`,
			width: 0,
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" :size="size" :css="wrapperCss">
		<FluxImage
			ref="$image"
			:rsc="from"
			:size="size"
			:css="imageCss"
		/>
	</FluxWrapper>
</template>
