<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import { floor } from '../../shared/Maths';
	import useTransitionMixin, {
		TransitionProps,
	} from '../../mixins/transition';
	import { Conf } from './types';

	const props = defineProps<TransitionProps>();

	const $from: Ref<null | any> = ref(null);

	const conf: Conf = reactive({
		totalDuration: 1500,
		easing: 'linear',
	});

	useTransitionMixin(conf, props.options);

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

	const transformNumber: number = floor(Math.random() * 4);
	const transform = transforms[transformNumber];

	const css: CSSProperties = {
		transformOrigin: transform.originX + ' ' + transform.originY,
	};

	const onPlay = () => {
		if ($from.value === null) {
			return;
		}

		$from.value.transform({
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
