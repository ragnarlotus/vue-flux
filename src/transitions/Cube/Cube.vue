<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxCube } from '../../components';
	import { TransitionCubeProps, TransitionCubeConf } from './types';
	import { Turns } from '../../components/FluxCube';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionCubeProps>();

	const $cube: Ref<null | InstanceType<typeof FluxCube>> = ref(null);

	const conf: TransitionCubeConf = reactive({
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

	const turn = {
		[Directions.prev]: Turns.right,
		[Directions.next]: Turns.left,
	}[conf.direction!];

	const onPlay = () => {
		if (props.displayComponent !== null) {
			props.displayComponent.hide();
		}

		$cube.value!.turn(turn);
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
