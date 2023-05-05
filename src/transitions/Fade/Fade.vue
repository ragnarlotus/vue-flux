<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition, { TransitionProps } from '../transition';
	import { Conf } from './types';

	const props = defineProps<TransitionProps>();

	const $from: Ref<null | any> = ref(null);

	const conf: Conf = reactive({
		totalDuration: 1200,
		easing: 'ease-in',
	});

	useTransition(conf, props.options);

	const fromCss: CSSProperties = {
		zIndex: 1,
	};

	const onPlay = () => {
		if ($from.value === null) {
			return;
		}

		$from.value.transform({
			transition: `opacity ${conf.totalDuration}ms ${conf.easing}`,
			opacity: 0,
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
		:css="fromCss"
	/>
</template>
