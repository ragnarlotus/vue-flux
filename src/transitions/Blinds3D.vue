<script setup>
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxGrid from '@/components/FluxGrid.vue';

	const $grid = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		rows: 1,
		cols: 6,
		tileDuration: 800,
		easing: 'ease-out',
		tileDelay: 150,
		gridCss: {
			perspective: '800px',
		},
		rscs: {
			front: props.from,
			back: props.to,
		},
	});

	useTransitionMixin(props.options, conf);

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const getDelay = {
		prev: i => (conf.cols - i - 1) * conf.tileDelay,
		next: i => i * conf.tileDelay,
	};

	const onPlay = () => {
		if (props.current)
			props.current.hide();

		const sides = {
			prev: 'backl',
			next: 'backr',
		};

		$grid.value.transform((tile, i) => {
			tile.setCss({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[conf.direction](i)}ms`,
			});

			tile.turn(sides[conf.direction]);
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
		:rscs="conf.rscs"
		:css="conf.gridCss"
	/>
</template>
