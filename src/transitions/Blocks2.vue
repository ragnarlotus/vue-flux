<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $grid = ref(null);
	const $background = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 800,
		easing: 'ease',
		tileDelay: 80,
		gridRsc: null,
		tileCss: {},
		gridCss: {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 2,
		},
		backgroundRsc: null,
		backgroundCss: {
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1,
		},
	});

	usePartials(props.options, conf);

	const totalDuration = conf.tileDelay * (conf.rows + conf.cols) + conf.tileDuration;

	if (!props.options.rows) {
		let divider = props.size.width / conf.cols;
		conf.rows = Math.floor(props.size.height / divider);
	}

	const setup = {
		prev: () => {
			conf.gridRsc = props.to;
			conf.backgroundRsc = props.from;

			conf.tileCss = {
				opacity: 0,
				transform: 'scale(0.3)',
			};
		},

		next: () => {
			conf.gridRsc = props.from;
		},
	};

	setup[conf.direction]();

	const getDelay = i => {
		const row = $grid.getRowNumber(i);
		const col = $grid.getColNumber(i);
		let delay = col + row;

		if (conf.direction === 'prev')
			delay = conf.rows + conf.cols - delay - 1;

		return delay * conf.tileDelay;
	};

	const play = {
		prev: () => {
			$grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(i)}ms`,
					opacity: 1,
					transform: 'scale(1)',
				});
			});
		},

		next: () => {
			$grid.transform((tile, i) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(i)}ms`,
					opacity: 0,
					transform: 'scale(0.3)',
				});
			});
		},
	};

	const onPlay = () => {
		play[conf.direction]();
	};

	defineExpose(onPlay, totalDuration);
</script>

<template>
	<div>
		<FluxGrid
			ref="$grid"
			:rows="conf.rows"
			:cols="conf.cols"
			:size="size"
			:rsc="gridRsc"
			:tile-css="tileCss"
			:css="gridCss"
		/>

		<FluxImage
			v-if="backgroundRsc"
			ref="$background"
			:size="size"
			:rsc="backgroundRsc"
			:css="backgroundCss"
		/>
	</div>
</template>
