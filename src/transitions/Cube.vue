<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxCube from '@/components/FluxCube.vue';

	const $cube = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1400,
		easing: 'ease-out',
		rscs: {
			front: props.from,
			left: props.to,
			right: props.to,
		},
		cubeCss: {},
	});

	usePartials(props.options, conf);

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	conf.cubeCss.transition = `all ${conf.totalDuration}ms ${conf.easing}`;

	const onPlay = () => {
		if (props.current)
			props.current.hide();

		const sides = {
			next: 'left',
			prev: 'right',
		};

		$cube.turn(sides[conf.direction]);
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxCube
		ref="$cube"
		:rscs="conf.rscs"
		:size="size"
		:depth="size.width"
		:css="cubeCss"
	/>
</template>
