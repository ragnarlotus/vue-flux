<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxCube, FluxGrid, Turns } from '../../components';
	import { TransitionBlinds3DProps, TransitionBlinds3DConf } from './types';

	const props = defineProps<TransitionBlinds3DProps>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: TransitionBlinds3DConf = reactive({
		rows: 1,
		cols: 6,
		tileDuration: 800,
		tileDelay: 150,
		easing: 'ease-out',
	});

	useTransition(conf, props.options);

	const gridCss: CSSProperties = {
		perspective: '800px',
	};

	const rscs = {
		front: props.from,
		back: props.to,
	};

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const getDelay = {
		prev: (index: number) => (conf.cols - index - 1) * conf.tileDelay,
		next: (index: number) => index * conf.tileDelay,
	};

	const turn = {
		prev: Turns.backl,
		next: Turns.backr,
	}[conf.direction!];

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
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:rscs="rscs"
		:css="gridCss"
	/>
</template>
