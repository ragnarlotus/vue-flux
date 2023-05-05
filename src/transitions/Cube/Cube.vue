<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxCube } from '../../components';
	import { Conf } from './types';

	const props = defineProps<TransitionProps>();

	const $cube: Ref<null | typeof FluxCube> = ref(null);

	const conf: Conf = reactive({
		totalDuration: 1400,
		easing: 'ease-out',
	});

	useTransition(conf, props.options);

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const rscs = {
		front: props.from,
		left: props.to,
		right: props.to,
	};

	const cubeCss: CSSProperties = {
		transition: `all ${conf.totalDuration}ms ${conf.easing}`,
	};

	const onPlay = () => {
		if ($cube.value === null) {
			return;
		}

		if (props.displayComponent.value !== null) {
			props.displayComponent.hide();
		}

		const sides = {
			next: 'left',
			prev: 'right',
		};

		$cube.value.turn(sides[conf.direction!]);
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxCube
		ref="$cube"
		:rscs="rscs"
		:size="size"
		:depth="size.width.value!"
		:css="cubeCss"
	/>
</template>
