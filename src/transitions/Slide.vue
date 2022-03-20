<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $left = ref(null);
	const $right = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
		left: null,
		right: null,
		wrapperSize: {
			width: props.size.width * 2,
			height: props.size.height,
		},
		wrapperCss: {
			display: 'flex',
			flexWrap: 'nowrap',
		},
	});

	const transition = `transform ${conf.totalDuration}ms ${conf.easing}`;

	const setup = {
		prev: () => {
			conf.left = props.to;
			conf.right = props.from;
			conf.wrapperCss.transform = 'translateX(-50%)';
		},

		next: () => {
			conf.left = props.from;
			conf.right = props.to;
		},
	};

	setup[conf.direction]();

	const play = {
		prev: () => {
			$wrapper.transform({
				transition: transition,
				transform: 'translateX(0)',
			});
		},

		next: () => {
			$wrapper.transform({
				transition: transition,
				transform: 'translateX(-50%)'
			});
		},
	};

	const onPlay = () => {
		play[conf.direction]();
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxWrapper ref="$wrapper" :size="conf.wrapperSize" :css="conf.wrapperCss">
		<FluxImage
			ref="$left"
			:rsc="left"
			:size="size"
		/>
		<FluxImage
			ref="$right"
			:rsc="right"
			:size="size"
		/>
	</FluxWrapper>
</template>
