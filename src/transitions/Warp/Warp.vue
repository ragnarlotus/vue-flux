<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxVortex } from '../../components';
	import { TransitionWarpProps, TransitionWarpConf } from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionWarpProps>();

	const $vortex: Ref<null | InstanceType<typeof FluxVortex>> = ref(null);

	const conf: TransitionWarpConf = reactive({
		circles: 7,
		tileDuration: 800,
		tileDelay: 150,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = {
		[Directions.prev]: (index: number) =>
			(conf.circles - index - 1) * conf.tileDelay,
		[Directions.next]: (index: number) => index * conf.tileDelay,
	};

	const getDeg = (index: number) => (index % 2 === 0 ? '-90' : '90');

	const onPlay = () => {
		$vortex.value!.transform((tile: FluxComponent, index: number) => {
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
