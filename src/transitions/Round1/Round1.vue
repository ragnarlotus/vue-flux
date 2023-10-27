<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import { floor } from '../../shared/Maths';
	import useTransition from '../useTransition';
	import { FluxGrid } from '../../components';
	import { Round1Props, Round1Conf } from './types';
	import { Directions } from '../../controllers/Player';
	import { Turns } from '../../components';

	const props = defineProps<Round1Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const conf: Round1Conf = reactive({
		rows: null,
		cols: 8,
		tileDuration: 800,
		easing: 'ease-out',
		tileDelay: 150,
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

	if (conf.rows === null) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = floor(props.size.height.value! / divider);
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

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		if (props.displayComponent) {
			props.displayComponent.hide();
		}

		const sides = {
			[Directions.prev]: Turns.backl,
			[Directions.next]: Turns.backr,
		};

		$grid.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay(index)}ms`;

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
		:rows="conf.rows!"
		:cols="conf.cols"
		:size="size"
		:rscs="rscs"
		:css="gridCss"
	/>
</template>
