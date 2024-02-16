<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxCube, FluxGrid } from '../../components';
	import { TransitionRound1Props, TransitionRound1Conf } from './types';
	import { Directions } from '../../controllers/Player';
	import { Turns } from '../../components';

	const props = defineProps<TransitionRound1Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionRound1Conf = reactive({
		rows: 0,
		cols: 8,
		tileDuration: 800,
		tileDelay: 150,
		easing: 'ease-out',
	});

	useTransition(conf, props.options);

	const rscs = {
		front: props.from,
		back: props.to,
	};

	const gridCss: CSSProperties = {
		perspective: '800px',
	};

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
	}

	const multiplier = conf.rows > conf.cols ? conf.rows : conf.cols;

	const totalDuration = conf.tileDelay * multiplier * 2;

	const getDelay = (index: number) => {
		const row = $grid.value!.getRowNumber(index, conf.cols);
		const col = $grid.value!.getColNumber(index, conf.cols);
		let delay = col + row;

		if (conf.direction === Directions.prev) {
			delay = conf.rows! + conf.cols - delay - 1;
		}

		return delay * conf.tileDelay;
	};

	const turn = {
		[Directions.prev]: Turns.backl,
		[Directions.next]: Turns.backr,
	}[conf.direction!];

	const onPlay = () => {
		if (props.displayComponent) {
			props.displayComponent.hide();
		}

		$grid.value!.transform(
			(tile: InstanceType<typeof FluxCube>, index: number) => {
				const transition = `all ${conf.tileDuration}ms ${
					conf.easing
				} ${getDelay(index)}ms`;

				tile.setCss({
					transition,
				});

				tile.turn(turn);
			}
		);
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
		:rscs="rscs"
		:css="gridCss"
	/>
</template>
