<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 300,
		easing: 'linear',
		tileDelay: 1000,
	});

	useTransitionMixin(props.options, conf);

	if (!props.options.rows) {
		const divider = props.size.width / conf.cols;
		conf.rows = Math.floor(props.size.height / divider);
	}

	const totalDuration = conf.tileDelay + conf.tileDuration;

	const getDelay = () => Math.floor(Math.random() * conf.tileDelay);

	const onPlay = () => {
		$grid.value.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(
					i
				)}ms`,
				opacity: '0',
				transform: 'scale(0.3, 0.3)',
			});
		});
	};

	defineExpose({
		onPlay,
		totalDuration,
	});
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
