<script setup>
	import { ref, reactive } from 'vue';
	import { floor } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 9,
		cols: 9,
		tileDuration: 800,
		rotateX: '-540',
		easing: 'linear',
		tileDelay: 100,
		gridCss: {
			perspective: '1200px',
		},
		tileCss: {
			backfaceVisibility: 'hidden',
		},
	});

	useTransitionMixin(props.options, conf);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options.rows) {
		const divider = props.size.width / conf.cols;
		conf.rows = floor(props.size.height / divider);
	}

	const totalDuration = (conf.cols / 2 + conf.rows) * (conf.tileDelay * 2);

	const getDelay = i => {
		const row = $grid.value.getRowNumber(i);
		const col = $grid.value.getColNumber(i);

		let rowDelay, colDelay;

		if (conf.direction === 'prev') {
			rowDelay = Math.abs(conf.rows / 2 - 0.5 - row);
			colDelay = Math.abs(conf.cols - col);

		} else {
			rowDelay = Math.abs(conf.rows / 2 - 0.5 - row);
			colDelay = Math.abs(col);
		}

		const delay = rowDelay + colDelay - 1;

		return delay * conf.tileDelay;
	};

	const onPlay = () => {
		$grid.value.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(i)}ms`,
				opacity: '0',
				transform: `rotateY(${conf.rotateX}deg)`,
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
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:depth="0"
		:rscs="from"
		:css="conf.gridCss"
		:tile-css="conf.tileCss"
	/>
</template>
