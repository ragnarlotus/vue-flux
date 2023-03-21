<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $grid = ref(null);
	const $background = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 800,
		tileDelay: 80,
		easing: 'ease',
	});

	useTransitionMixin(props.options, conf);

	let tileCss = {};

	const background = {
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

	const totalDuration =
		conf.tileDelay * (conf.rows + conf.cols) + conf.tileDuration;

	if (!props.options.rows) {
		let divider = props.size.width / conf.cols;
		conf.rows = Math.floor(props.size.height / divider);
	}

	const setup = {
		prev: () => {
			grid.rsc = props.to;
			background.rsc = props.from;

			tileCss = {
				opacity: 0,
				transform: 'scale(0.3)',
			};
		},

		next: () => {
			grid.rsc = props.from;
		},
	};

	setup[conf.direction]();

	const getDelay = (i) => {
		const row = $grid.value.getRowNumber(i);
		const col = $grid.value.getColNumber(i);
		let delay = col + row;

		if (conf.direction === 'prev') delay = conf.rows + conf.cols - delay - 1;

		return delay * conf.tileDelay;
	};

	const play = {
		prev: () => {
			$grid.value.transform((tile, i) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${
						conf.easing
					} ${getDelay(i)}ms`,
					opacity: 1,
					transform: 'scale(1)',
				});
			});
		},

		next: () => {
			$grid.value.transform((tile, i) => {
				tile.transform({
					transition: `all ${conf.tileDuration}ms ${
						conf.easing
					} ${getDelay(i)}ms`,
					opacity: 0,
					transform: 'scale(0.3)',
				});
			});
		},
	};

	const onPlay = () => {
		play[conf.direction]();
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

		<FluxImage
			v-if="background.rsc"
			ref="$background"
			:size="size"
			v-bind="background"
		/>
	</div>
</template>
