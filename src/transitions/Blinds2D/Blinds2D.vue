<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import { FluxComponent, FluxGrid } from '../../components';
	import useTransition from '../useTransition';
	import { TransitionBlinds2DProps, TransitionBlinds2DConf } from './types';
	import { Sides } from '../../components/FluxCube';

	const props = defineProps<TransitionBlinds2DProps>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionBlinds2DConf = reactive({
		rows: 1,
		cols: 10,
		tileDuration: 800,
		tileDelay: 100,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	const rscs = {
		[Sides.front]: props.from,
	};

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		prev: (index: number) => (conf.cols - index - 1) * conf.tileDelay,
		next: (index: number) => index * conf.tileDelay,
	};

	const onPlay = () => {
		$grid.value!.transform((tile: FluxComponent, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay[conf.direction!](index)}ms`;

			tile.transform({
				transition,
				opacity: '0.1',
				transform: 'scaleX(0)',
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
		:rscs="rscs"
	/>
</template>
