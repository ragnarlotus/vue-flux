<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxGrid } from '../../components';
	import { TransitionRound2Props, TransitionRound2Conf } from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionRound2Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionRound2Conf = reactive({
		rows: 0,
		cols: 9,
		tileDuration: 800,
		tileDelay: 100,
		rotateX: -540,
		easing: 'linear',
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

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
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
		$grid.value!.transform((tile: FluxComponent, index: number) => {
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
