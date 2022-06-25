<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $left = ref(null);
	const $right = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransitionMixin(props.options, conf);

	const transition = `transform ${conf.totalDuration}ms ${conf.easing}`;

	const wrapper = {
		size: {
			width: props.size.width * 2,
			height: props.size.height,
		},
		css: {
			display: 'flex',
			flexWrap: 'nowrap',
		}
	};

	let left, right;

	const setup = {
		prev: () => {
			left = props.to;
			right = props.from;
			wrapper.css.transform = 'translateX(-50%)';
		},

		next: () => {
			left = props.from;
			right = props.to;
		},
	};

	setup[conf.direction]();

	const play = {
		prev: () => {
			$wrapper.value.transform({
				transition: transition,
				transform: 'translateX(0)',
			});
		},

		next: () => {
			$wrapper.value.transform({
				transition: transition,
				transform: 'translateX(-50%)'
			});
		},
	};

	const onPlay = () => {
		play[conf.direction]();
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" v-bind="wrapper">
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
