<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxGrid } from '../../components';
	import { TransitionWaveProps, TransitionWaveConf } from './types';
	import { Directions } from '../../controllers/Player';
	import { FluxCube, Turns } from '../../components/FluxCube';

	const props = defineProps<TransitionWaveProps>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionWaveConf = reactive({
		rows: 1,
		cols: 8,
		tileDuration: 900,
		tileDelay: 110,
		sideColor: '#333',
		easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
	});

	useTransition(conf, props.options);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const rscs = {
		front: props.from,
		top: props.to,
	};

	const colors = {
		left: conf.sideColor,
		right: conf.sideColor,
	};

	const gridCss: CSSProperties = {
		perspective: '1200px',
	};

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		[Directions.prev]: (index: number) =>
			(conf.cols - index - 1) * conf.tileDelay,
		[Directions.next]: (index: number) => index * conf.tileDelay,
	};

	const onPlay = () => {
		if (props.displayComponent) {
			props.displayComponent.hide();
		}

		$grid.value!.transform(
			(tile: InstanceType<typeof FluxCube>, index: number) => {
				const transition = `all ${conf.tileDuration}ms ${
					conf.easing
				} ${getDelay[conf.direction!](index)}ms`;

				tile.setCss({
					transition,
				});

				tile.turn(Turns.bottom);
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
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:rscs="rscs"
		:colors="colors"
		:depth="size.height.value!"
		:css="gridCss"
	/>
</template>
