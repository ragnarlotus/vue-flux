<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxGrid } from '../../components';
	import { Blocks1Props, Blocks1Conf } from './types';

	const props = defineProps<Blocks1Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: Blocks1Conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 300,
		easing: 'linear',
		tileDelay: 1000,
	});

	useTransition(conf, props.options);

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
	}

	const totalDuration = conf.tileDelay + conf.tileDuration;

	const getDelay = () => Math.floor(Math.random() * conf.tileDelay);

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		$grid.value.transform((tile: any) => {
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
