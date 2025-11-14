<script setup lang="ts">
	import { ref, reactive, type Ref, type CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import type { TransitionFallProps, TransitionFallConf } from './types';
	import type { FluxComponent } from '../../components';

	const props = defineProps<TransitionFallProps>();

	const $from: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionFallConf = reactive({
		totalDuration: 1600,
		easing: 'ease-in',
	});

	useTransition(conf, props.options);

	// eslint-disable-next-line vue/no-mutating-props
	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const style: CSSProperties = {
		transformOrigin: 'center bottom',
	};

	const onPlay = () => {
		$from.value!.transform({
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
	<component :is="from.transition.component" ref="$from" :rsc="from" :size="size" :style="style" />
</template>
