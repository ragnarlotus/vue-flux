<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransitionMixin, {
		TransitionProps,
	} from '../../mixins/transition';
	import { FluxVortex } from '../../components';
	import { Conf } from './types';
	import { Directions } from '../../types';

	const props = defineProps<TransitionProps>();

	const $vortex: Ref<null | typeof FluxVortex> = ref(null);

	const conf: Conf = reactive({
		circles: 7,
		tileDuration: 800,
		easing: 'linear',
		tileDelay: 150,
	});

	useTransitionMixin(conf, props.options);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = {
		[Directions.prev]: (index: number) =>
			(conf.circles - index - 1) * conf.tileDelay,
		[Directions.next]: (index: number) => index * conf.tileDelay,
	};

	const getDeg = (index: number) => (index % 2 === 0 ? '-90' : '90');

	const onPlay = () => {
		if ($vortex.value === null) {
			return;
		}

		$vortex.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay[conf.direction!](index)}ms`;

			tile.transform({
				transition,
				opacity: '0',
				transform: `rotateZ(${getDeg(index)}deg)`,
			});
		});
	};

	defineExpose({
		onPlay,
		totalDuration,
	});
</script>

<template>
	<FluxVortex ref="$vortex" :size="size" :circles="conf.circles" :rsc="from" />
</template>
