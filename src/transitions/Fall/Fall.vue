<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { Conf } from './types';

	export interface Props extends TransitionProps {}

	const props = defineProps<Props>();

	const $from: Ref<null | any> = ref(null);

	const conf: Conf = reactive({
		totalDuration: 1600,
		easing: 'ease-in',
	});

	useTransition(conf, props.options);

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const style: CSSProperties = {
		transformOrigin: 'center bottom',
	};

	const onPlay = () => {
		if ($from.value === null) {
			return;
		}

		$from.value.transform({
			transition: `transform ${conf.totalDuration}ms ${conf.easing}`,
			transform: 'rotateX(-83.6deg)',
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<component
		:is="from.transition.component"
		ref="$from"
		:rsc="from"
		:size="size"
		:style="style"
	/>
</template>
