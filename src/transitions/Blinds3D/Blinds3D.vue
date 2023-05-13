<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxGrid } from '../../components';
	import { Conf } from './types';

	export interface Props extends TransitionProps {}

	const props = defineProps<Props>();

	const $grid: Ref<null | typeof FluxGrid> = ref(null);

	const conf: Conf = reactive({
		rows: 1,
		cols: 6,
		tileDuration: 800,
		easing: 'ease-out',
		tileDelay: 150,
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

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		if (props.displayComponent) {
			props.displayComponent.hide();
		}

		const sides = {
			prev: 'backl',
			next: 'backr',
		};

		$grid.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay[conf.direction!](index)}ms`;

			tile.setCss({
				transition,
			});

			tile.turn(sides[conf.direction!]);
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
		:css="gridCss"
	/>
</template>
