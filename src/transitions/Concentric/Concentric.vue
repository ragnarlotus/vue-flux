<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxVortex } from '../../components';
	import {
		TransitionConcentricProps,
		TransitionConcentricConf,
	} from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionConcentricProps>();

	const $vortex: Ref<null | InstanceType<typeof FluxVortex>> = ref(null);

	const conf: TransitionConcentricConf = reactive({
		circles: 7,
		tileDuration: 800,
		tileDelay: 150,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = (index: number) => index * conf.tileDelay;

	const deg = {
		[Directions.prev]: '-90',
		[Directions.next]: '90',
	}[conf.direction!];

	const onPlay = () => {
		$vortex.value!.transform((tile: FluxComponent, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay(index)}ms`;

			tile.transform({
				transition,
				opacity: '0',
				transform: `rotateZ(${deg}deg)`,
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
