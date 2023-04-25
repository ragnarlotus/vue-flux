<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import { floor } from '@/shared/Maths';
	import useTransitionMixin, { baseProps } from '@/mixins/transition';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 9,
		cols: 9,
		tileDuration: 300,
		easing: 'linear',
		tileDelay: 100,
	});

	useTransitionMixin(props.options, conf);

	const cssGrid = {
		overflow: 'visible',
	};

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options.rows) {
		const divider = props.size.width / conf.cols;
		conf.rows = floor(props.size.height / divider);
	}

	const totalDuration = (conf.cols / 2 + conf.rows / 2) * (conf.tileDelay * 2);

	const getDelay = (i) => {
		const row = $grid.value.getRowNumber(i);
		const col = $grid.value.getColNumber(i);

		const rowDelay = Math.abs(conf.rows / 2 - 0.5 - row);
		const colDelay = Math.abs(conf.cols / 2 - 0.5 - col);
		const delay = rowDelay + colDelay - 1;

		return delay * conf.tileDelay;
	};

	const onPlay = () => {
		$grid.value.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(
					i
				)}ms`,
				borderRadius: '100%',
				opacity: '0',
				transform: 'scale(2)',
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
		:rsc="from"
		:css="cssGrid"
	/>
</template>
