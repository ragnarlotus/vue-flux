<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxGrid } from '../../components';
	import { WaterfallProps, WaterfallConf } from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<WaterfallProps>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: WaterfallConf = reactive({
		rows: 1,
		cols: 10,
		tileDuration: 600,
		tileDelay: 90,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
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
				transform: `translateY(100%)`,
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
