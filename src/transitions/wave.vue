<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
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
	});

	useTransitionMixin(props.options, conf);

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

	const gridCss = {
		overflow: 'visible',
		perspective: '1200px',
	};

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		prev: i => (conf.cols - i - 1) * conf.tileDelay,
		next: i => i * conf.tileDelay,
	};

	const onPlay = () => {
		if (props.displayComponent)
			props.displayComponent.hide();

		$grid.value.transform((tile, i) => {
			tile.setCss({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[conf.direction](i)}ms`,
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
		:depth="size.height"
		:css="gridCss"
	/>
</template>
