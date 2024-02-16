<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxGrid } from '../../components';
	import { TransitionExplodeProps, TransitionExplodeConf } from './types';

	const props = defineProps<TransitionExplodeProps>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionExplodeConf = reactive({
		rows: 9,
		cols: 9,
		tileDuration: 300,
		tileDelay: 100,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	const cssGrid: CSSProperties = {
		overflow: 'visible',
	};

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
	}

	const totalDuration = (conf.cols / 2 + conf.rows / 2) * (conf.tileDelay * 2);

	const getDelay = (index: number) => {
		const row = $grid.value!.getRowNumber(index, conf.cols);
		const col = $grid.value!.getColNumber(index, conf.cols);

		const rowDelay = Math.abs(conf.rows / 2 - 0.5 - row);
		const colDelay = Math.abs(conf.cols / 2 - 0.5 - col);
		const delay = rowDelay + colDelay - 1;

		return delay * conf.tileDelay;
	};

	const onPlay = () => {
		$grid.value!.transform((tile: FluxComponent, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay(index)}ms`;

			tile.transform({
				transition,
				borderRadius: '100%',
				opacity: '0',
				transform: 'scale(2)',
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
		:css="cssGrid"
	/>
</template>
