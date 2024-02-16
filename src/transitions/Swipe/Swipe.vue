<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxWrapper } from '../../components';
	import { TransitionSwipeProps, TransitionSwipeConf } from './types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionSwipeProps>();

	const $wrapper: Ref<null | InstanceType<typeof FluxWrapper>> = ref(null);
	const $from: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionSwipeConf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransition(conf, props.options);

	const wrapperCss: CSSProperties = {
		position: 'absolute',
		top: 0,
		display: 'flex',
		flexWrap: 'nowrap',
	};

	const fromCss: CSSProperties = {
		flex: '0 0 auto',
	};

	const setup = {
		[Directions.prev]: () => {
			Object.assign(wrapperCss, {
				right: 0,
				justifyContent: 'flex-end',
			});
		},

		[Directions.next]: () => {
			Object.assign(wrapperCss, {
				left: 0,
				justifyContent: 'flex-start',
			});
		},
	};

	setup[conf.direction!]();

	const onPlay = () => {
		$wrapper.value!.transform({
			transition: `width ${conf.totalDuration}ms ${conf.easing}`,
			width: 0,
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" :size="size" :css="wrapperCss">
		<component
			:is="from.transition.component"
			ref="$from"
			:rsc="from"
			:size="size"
			:css="fromCss"
		/>
	</FluxWrapper>
</template>
