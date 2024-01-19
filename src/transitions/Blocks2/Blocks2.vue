<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxGrid } from '../../components';
	import {
		TransitionBlocks2Props,
		TransitionBlocks2Conf,
		BackgroundProps,
	} from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionBlocks2Props>();

	const $grid: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);
	const $background: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionBlocks2Conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 800,
		tileDelay: 80,
		easing: 'ease',
	});

	useTransition(conf, props.options);

	const totalDuration =
		conf.tileDelay * (conf.rows + conf.cols) + conf.tileDuration;

	if (!props.options?.rows) {
		const divider = props.size.width.value! / conf.cols;
		conf.rows = Math.floor(props.size.height.value! / divider);
	}

	const background: BackgroundProps = {
		rsc: null,
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1,
		},
	};

	const grid = JSON.parse(JSON.stringify(background));
	grid.css.zIndex = 2;

	let tileCss = {};

	const setup = {
		prev: () => {
			grid.rsc = props.to;
			background.rsc = props.from;

			tileCss = {
				opacity: '0',
				transform: 'scale(0.3)',
			};
		},

		next: () => {
			grid.rsc = props.from;
		},
	};

	setup[conf.direction!]();

	const getDelay = (index: number) => {
		const row = $grid.value!.getRowNumber(index, conf.cols);
		const col = $grid.value!.getColNumber(index, conf.cols);
		let delay = col + row;

		if (conf.direction === Directions.prev) {
			delay = conf.rows + conf.cols - delay - 1;
		}

		return delay * conf.tileDelay;
	};

	const play = {
		prev: () => {
			$grid.value!.transform((tile: FluxComponent, index: number) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${
						conf.easing
					} ${getDelay(index)}ms`,
					opacity: '1',
					transform: 'scale(1)',
				});
			});
		},

		next: () => {
			$grid.value!.transform((tile: FluxComponent, index: number) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${
						conf.easing
					} ${getDelay(index)}ms`,
					opacity: '0',
					transform: 'scale(0.3)',
				});
			});
		},
	};

	const onPlay = () => {
		play[conf.direction!]();
	};

	defineExpose({
		onPlay,
		totalDuration,
	});
</script>

<template>
	<div>
		<FluxGrid
			ref="$grid"
			:rows="conf.rows"
			:cols="conf.cols"
			:size="size"
			:tile-css="tileCss"
			v-bind="grid"
		/>

		<component
			:is="background.rsc.transition.component"
			v-if="background.rsc !== null"
			ref="$background"
			:size="size"
			v-bind="background"
		/>
	</div>
</template>
