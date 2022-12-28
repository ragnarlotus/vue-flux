<script setup>
	import { ref, reactive } from 'vue';
	import { diag } from '@/libs/Maths.js';
	import useTransitionMixin, { baseProps } from '@/mixins/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		circles: 2,
		totalDuration: 900,
		easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
		backgroundColor: '#111',
	});

	useTransitionMixin(props.options, conf);

	const diagSize = diag(props.size);

	const image = {
		rsc: props.from,
		css: {
			alignSelf: 'center',
			flex: 'none',
		},
	};

	const wrapper = {
		size: {
			width: diagSize,
			height: diagSize,
		},
		css: {
			boxSizing: 'border-box',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			overflow: 'hidden',
			borderRadius: '50%',
			border: '0 solid ' + conf.backgroundColor,
			top: (props.size.height - diagSize) / 2 + 'px',
			left: (props.size.width - diagSize) / 2 + 'px',
		},
	};

	const onPlay = () => {
		$wrapper.value.transform({
			transition: `all ${conf.totalDuration / 2 - 50}ms ${conf.easing} 0ms`,
			borderWidth: diagSize / 2 + 'px',
		});

		setTimeout(() => {
			$image.value.hide();

			$wrapper.value.transform({
				transition: `all ${conf.totalDuration / 2 - 50}ms ${
					conf.easing
				} 0ms`,
				borderWidth: 0,
			});
		}, conf.totalDuration / 2 + 50);
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" v-bind="wrapper">
		<FluxImage ref="$image" :size="size" v-bind="image" />
	</FluxWrapper>
</template>
