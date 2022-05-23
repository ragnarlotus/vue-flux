<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 1,
		cols: 10,
		tileDuration: 800,
		easing: 'linear',
		tileDelay: 100,
	});

	useTransitionMixin(props.options, conf);

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		prev: i => (conf.cols - i - 1) * conf.tileDelay,
		next: i => i * conf.tileDelay,
	};

	const onPlay = () => {
		$grid.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[conf.direction](i)}ms`,
				opacity: '0.1',
				transform: 'scaleX(0)',
			});
		});
	};

	defineExpose(onPlay, totalDuration);
</script>

<template>
	<FluxGrid
		ref="$grid"
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:rsc="from"
	/>
</template>
