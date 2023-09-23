<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import { floor } from '../../shared/Maths';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxGrid } from '../../components';
	import { Conf } from './types';

	export interface Props extends TransitionProps {}

	const props = defineProps<Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: Conf = reactive({
		rows: 9,
		cols: 9,
		tileDuration: 300,
		easing: 'linear',
		tileDelay: 100,
	});

	useTransition(conf, props.options);

	const cssGrid: CSSProperties = {
		overflow: 'visible',
	};

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = floor(props.size.height.value! / divider);
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
		if ($grid.value === null) {
			return;
		}

		$grid.value.transform((tile: any, index: number) => {
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
