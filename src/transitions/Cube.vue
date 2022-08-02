<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxCube from '@/components/FluxCube.vue';

	const $cube = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-out',
	});

	useTransitionMixin(props.options, conf);

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const rscs = {
		front: props.from,
		left: props.to,
		right: props.to,
	};

	const cubeCss = {
		transition: `all ${conf.totalDuration}ms ${conf.easing}`,
	};

	const onPlay = () => {
		if (props.displayComponent)
			props.displayComponent.hide();

		const sides = {
			next: 'left',
			prev: 'right',
		};

		$cube.value.turn(sides[conf.direction]);
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxCube
		ref="$cube"
		:rscs="rscs"
		:size="size"
		:depth="size.width"
		:css="cubeCss"
	/>
</template>
