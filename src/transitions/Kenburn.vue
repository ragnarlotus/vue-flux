<script setup>
	import { ref, reactive } from 'vue';
	import { floor } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxImage from '@/components/FluxImage.vue';

	const $image = ref(null);
	const props = defineProps(baseProps);

	const getTransform = () => {
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

		return transform[floor((Math.random() * 4) + 1)]
	};

	const conf = reactive({
		totalDuration: 1500,
		easing: 'linear',
		transform: getTransform(),
		css: {},
	});

	useTransitionMixin(props.options, conf);

	conf.css.transformOrigin = conf.transform.originX +' '+ conf.transform.originY;

	const onPlay = () => {
		$image.transform({
			transition: `all ${conf.totalDuration}ms ${conf.easing}`,
			transform: `scale(${conf.transform.scale}) translate(${conf.transform.translateX}, ${conf.transform.translateY})`,
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
		:css="conf.css"
	/>
</template>
