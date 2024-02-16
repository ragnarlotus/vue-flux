<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { TransitionFadeProps, TransitionFadeConf } from './types';
	import { FluxComponent } from '../../components';

	const props = defineProps<TransitionFadeProps>();

	const $from: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionFadeConf = reactive({
		totalDuration: 1200,
		easing: 'ease-in',
	});

	useTransition(conf, props.options);

	const fromCss: CSSProperties = {
		zIndex: 1,
	};

	const onPlay = () => {
		$from.value!.transform({
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
