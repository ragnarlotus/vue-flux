<script setup>
	import { ref, reactive } from 'vue';
	import { floor } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 8,
		cols: 8,
		tileDuration: 800,
		easing: 'ease-out',
		tileDelay: 150,
		rscs: {
			front: props.from,
			back: props.to,
		},
		gridCss: {
			perspective: '800px',
		},
	});

	useTransitionMixin(props.options, conf);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	if (!props.options.rows) {
		const divider = props.size.width / conf.cols;
		conf.rows = floor(props.size.height / divider);
	}

	const multiplier = conf.rows > conf.cols? conf.rows : conf.cols;

	const totalDuration = conf.tileDelay * multiplier * 2;

	const getDelay = i => {
		const row = $grid.getRowNumber(i);
		const col = $grid.getColNumber(i);
		let delay = col + row;

		if (conf.direction === 'prev')
			delay = conf.rows + conf.cols - delay - 1;

		return delay * conf.tileDelay;
	};

	const onPlay = () => {
		if (props.current)
			props.current.hide();

		const sides = {
			prev: 'backl',
			next: 'backr',
		};

		$grid.transform((tile, i) => {
			tile.setCss({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay(i)}ms`,
			});

			tile.turn(sides[conf.direction]);
		});
	}

	defineExpose(onPlay, totalDuration);
</script>

<template>
	<FluxGrid
		ref="$grid"
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:rscs="conf.rscs"
		:css="conf.gridCss"
	/>
</template>
