<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import useTransitionMixin, { baseProps } from '@/mixins/transition.js';
	import FluxVortex from '@/components/FluxVortex.vue';

	const $vortex = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		circles: 7,
		tileDuration: 800,
		easing: 'linear',
		tileDelay: 150,
	});

	useTransitionMixin(props.options, conf);

	const totalDuration = conf.tileDelay * conf.circles + conf.tileDuration;

	const getDelay = {
		prev: (i) => (conf.circles - i - 1) * conf.tileDelay,
		next: (i) => i * conf.tileDelay,
	};

	const getDeg = (i) => (i % 2 === 0 ? '-90' : '90');

	const onPlay = () => {
		$vortex.value.transform((tile, i) => {
			tile.transform({
				transition: `all ${conf.tileDuration}ms ${conf.easing} ${getDelay[
					conf.direction
				](i)}ms`,
				opacity: '0',
				transform: `rotateZ(${getDeg(i)}deg)`,
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
