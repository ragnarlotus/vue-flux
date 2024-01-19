<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { TransitionKenburnProps, TransitionKenburnConf } from './types';
	import { FluxComponent } from '../../components';

	const props = defineProps<TransitionKenburnProps>();

	const $from: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionKenburnConf = reactive({
		totalDuration: 1500,
		easing: 'linear',
	});

	useTransition(conf, props.options);

	const transforms = [
		{
			scale: '1.7',
			translateX: '-35%',
			translateY: '-35%',
			originX: 'top',
			originY: 'left',
		},

		{
			scale: '1.7',
			translateX: '35%',
			translateY: '-35%',
			originX: 'top',
			originY: 'right',
		},

		{
			scale: '1.7',
			translateX: '-35%',
			translateY: '35%',
			originX: 'bottom',
			originY: 'left',
		},

		{
			scale: '1.7',
			translateX: '35%',
			translateY: '35%',
			originX: 'bottom',
			originY: 'right',
		},
	];

	const transformNumber: number = Math.floor(Math.random() * 4);
	const transform = transforms[transformNumber];

	const css: CSSProperties = {
		transformOrigin: transform.originX + ' ' + transform.originY,
	};

	const onPlay = () => {
		$from.value!.transform({
			transition: `all ${conf.totalDuration}ms ${conf.easing}`,
			transform: `scale(${transform.scale}) translate(${transform.translateX}, ${transform.translateY})`,
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
		:css="css"
	/>
</template>
