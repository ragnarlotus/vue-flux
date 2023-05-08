<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxVortex } from '../../components';
	import { Conf } from './types';

	const props = defineProps<TransitionProps>();

	const $vortex: Ref<null | typeof FluxVortex> = ref(null);

	const conf: Conf = reactive({
		circles: 7,
		tileDuration: 800,
		easing: 'linear',
		tileDelay: 150,
	});

	useTransition(conf, props.options);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = (index: number) => index * conf.tileDelay;

	const onPlay = () => {
		if ($vortex.value === null) {
			return;
		}

		const deg = {
			prev: '-90',
			next: '90',
		};

		$vortex.value.transform((tile: any, index: number) => {
			const transition = `all ${conf.tileDuration}ms ${
				conf.easing
			} ${getDelay(index)}ms`;

			tile.transform({
				transition,
				opacity: '0',
				transform: `rotateZ(${deg[conf.direction!]}deg)`,
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