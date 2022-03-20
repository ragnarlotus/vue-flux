<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxVortex from '@/components/FluxVortex.vue';

	const $vortex = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		circles: 7,
		tileDuration: 800,
		easing: 'linear',
		tileDelay: 150,
	});

	usePartials(props.options, conf);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = i => i * conf.tileDelay;

	const onPlay = () => {
		const deg = {
			prev: '-90',
			next: '90',
		};

		$vortex.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(i)}ms`,
				opacity: '0',
				transform: `rotateZ(${deg[conf.direction]}deg)`,
			});
		});
	};

	defineExpose(onPlay, totalDuration);
</script>

<template>
	<FluxVortex
		ref="$vortex"
		:size="size"
		:circles="circles"
		:rsc="from"
	/>
</template>
