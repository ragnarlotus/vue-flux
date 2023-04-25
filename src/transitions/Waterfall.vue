<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransitionMixin, { BaseProps } from '../mixins/transition.js';
	import { FluxGrid } from '../components';

	interface ConfType {
		rows: number;
		cols: number;
		tileDuration: number;
		tileDelay: number;
		easing: string;
	}

	const $grid: Ref<null | typeof FluxGrid> = ref(null);
	const props = defineProps<BaseProps>();

	const conf = reactive<ConfType>({
		rows: 1,
		cols: 10,
		tileDuration: 600,
		tileDelay: 90,
		easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
	});

	useTransitionMixin(props.options, conf);

	const totalDuration = conf.tileDelay * conf.cols + conf.tileDuration;

	const getDelay = {
		prev: (i: number) => (conf.cols - i - 1) * conf.tileDelay,
		next: (i: number) => i * conf.tileDelay,
	};

	const onPlay = () => {
		if ($grid.value === null) {
			return;
		}

		$grid.value.transform((tile: props.to.transition, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[
					conf.direction
				](i)}ms`,
				opacity: '0.1',
				transform: `translateY(100%)`,
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
	/>
</template>
