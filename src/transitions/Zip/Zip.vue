<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxGrid } from '../../components';
	import { Conf } from './types';
	import { Directions } from '../../types';

	const props = defineProps<TransitionProps>();

	const $grid: Ref<null | typeof FluxGrid> = ref(null);

	const conf: Conf = reactive({
		rows: 1,
		cols: 10,
		tileDuration: 600,
		easing: 'ease-in',
		tileDelay: 80,
	});

	useTransition(conf, props.options);

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		[Directions.prev]: (index: number) =>
			(conf.cols - index - 1) * conf.tileDelay,
		[Directions.next]: (index: number) => index * conf.tileDelay,
	};

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		$grid.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay[conf.direction!](index)}ms`;

			tile.transform({
				transition,
				opacity: '0.1',
				transform: `translateY(${index % 2 ? '-' : ''}100%)`,
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
