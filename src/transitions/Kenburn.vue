<script setup>
	import { ref, reactive } from 'vue';
	import { floor } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxImage from '@/components/FluxImage.vue';

	const $image = ref(null);
	const props = defineProps(baseProps);

	const getTransform = (i) => {
		const transform = {
			1: {
				scale: '1.7',
				translateX: '-35%',
				translateY: '-35%',
				originX: 'top',
				originY: 'left',
			},

			2: {
				scale: '1.7',
				translateX: '35%',
				translateY: '-35%',
				originX: 'top',
				originY: 'right',
			},

			3: {
				scale: '1.7',
				translateX: '-35%',
				translateY: '35%',
				originX: 'bottom',
				originY: 'left',
			},

			4: {
				scale: '1.7',
				translateX: '35%',
				translateY: '35%',
				originX: 'bottom',
				originY: 'right',
			},
		};

		return transform[i];
	};

	const conf = reactive({
		totalDuration: 1500,
		easing: 'linear',
	});

	useTransitionMixin(props.options, conf);

	const transform = getTransform(floor((Math.random() * 4) + 1));

	const css = {
		transformOrigin: transform.originX +' '+ transform.originY,
	};

	const onPlay = () => {
		$image.value.transform({
			transition: `all ${conf.totalDuration}ms ${conf.easing}`,
			transform: `scale(${transform.scale}) translate(${transform.translateX}, ${transform.translateY})`,
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
		:css="css"
	/>
</template>
