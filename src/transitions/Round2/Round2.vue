<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import { floor } from '../../shared/Maths';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxGrid } from '../../components';
	import { Conf } from './types';
	import { Directions } from '../../types';

	export interface Props extends TransitionProps {}

	const props = defineProps<Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: Conf = reactive({
		rows: null,
		cols: 9,
		tileDuration: 800,
		tileDelay: 100,
		easing: 'linear',
		rotateX: -540,
	});

	useTransition(conf, props.options);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const gridCss: CSSProperties = {
		perspective: '1200px',
	};

	const tileCss: CSSProperties = {
		backfaceVisibility: 'hidden',
	};

	if (conf.rows === null) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = floor(props.size.height.value! / divider);
	}

	const totalDuration = (conf.cols / 2 + conf.rows) * (conf.tileDelay * 2);

	const getDelay = (index: number) => {
		const row = $grid.value!.getRowNumber(index, conf.cols);
		const col = $grid.value!.getColNumber(index, conf.cols);

		let rowDelay, colDelay;

		if (conf.direction === Directions.prev) {
			rowDelay = Math.abs(conf.rows! / 2 - 0.5 - row);
			colDelay = Math.abs(conf.cols - col);
		} else {
			rowDelay = Math.abs(conf.rows! / 2 - 0.5 - row);
			colDelay = Math.abs(col);
		}

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
				opacity: '0',
				transform: `rotateY(${conf.rotateX.toString()}deg)`,
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
		:rows="conf.rows!"
		:cols="conf.cols"
		:size="size"
		:depth="0"
		:rsc="from"
		:css="gridCss"
		:tile-css="tileCss"
	/>
</template>
