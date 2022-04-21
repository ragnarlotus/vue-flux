<script setup>
	import { ref, reactive } from 'vue';
	import usePartials, { baseProps } from '@/models/partials/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 1,
		cols: 8,
		tileDuration: 900,
		tileDelay: 110,
		easing: 'cubic-bezier(0.3, -0.3, 0.735, 0.285)',
		sideColor: '#333',
		gridCss: {
			overflow: 'visible',
			perspective: '1200px',
		},
		rscs: {
			front: props.from,
			top: props.to,
		},
		colors: {},
	});

	usePartials(props.options, conf);

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		prev: i => (conf.cols - i - 1) * conf.tileDelay,
		next: i => i * conf.tileDelay,
	};

	const onPlay = () => {
		if (props.current)
			props.current.hide();

		Object.assign(conf.colors, {
			left: conf.sideColor,
			right: conf.sideColor,
		});

		$grid.transform((tile, i) => {
			tile.setCss({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[conf.direction](i)}ms`,
			});

			tile.turnBottom();
		});
	};

	defineExpose(onPlay, totalDuration);
</script>

<template>
	<FluxGrid
		ref="$grid"
		:rows="conf.rows"
		:cols="conf.cols"
		:size="size"
		:rscs="conf.rscs"
		:colors="conf.colors"
		:depth="size.height"
		:css="conf.gridCss"
	/>
</template>
