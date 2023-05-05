<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxGrid } from '../../components';
	import { Conf } from './types';
	import { Directions } from '../../types';

	const props = defineProps<TransitionProps>();

	const $grid: Ref<null | typeof FluxGrid> = ref(null);

	const conf: Conf = reactive({
		rows: 1,
		cols: 8,
		tileDuration: 900,
		tileDelay: 110,
		easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
		sideColor: '#333',
	});

	useTransition(conf, props.options);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const rscs = {
		front: props.from,
		top: props.to,
	};

	const color = {
		left: conf.sideColor,
		right: conf.sideColor,
	};

	const gridCss: CSSProperties = {
		overflow: 'visible',
		perspective: '1200px',
	};

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		[Directions.prev]: (index: number) =>
			(conf.cols - index - 1) * conf.tileDelay,
		[Directions.next]: (index: number) => index * conf.tileDelay,
	};

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		if (props.displayComponent) {
			props.displayComponent.hide();
		}

		$grid.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay[conf.direction!](index)}ms`;

			tile.setCss({
				transition,
			});

			tile.turnBottom();
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
		:color="color"
		:depth="size.height.value!"
		:css="gridCss"
	/>
</template>
