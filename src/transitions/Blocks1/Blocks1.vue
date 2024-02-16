<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxGrid } from '../../components';
	import { TransitionBlocks1Props, TransitionBlocks1Conf } from './types';

	const props = defineProps<TransitionBlocks1Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionBlocks1Conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 300,
		tileDelay: 1000,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
	}

	const totalDuration = conf.tileDelay + conf.tileDuration;

	const getDelay = () => Math.floor(Math.random() * conf.tileDelay);

	const onPlay = () => {
		$grid.value!.transform((tile: FluxComponent) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay()}ms`;

			tile.transform({
				transition,
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
