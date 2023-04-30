<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransitionMixin, {
		TransitionProps,
	} from '../../mixins/transition';
	import { FluxWrapper } from '../../components';
	import { Conf } from './types';
	import { Directions } from '../../types';

	const props = defineProps<TransitionProps>();

	const $wrapper: Ref<null | typeof FluxWrapper> = ref(null);
	const $from: Ref<null | any> = ref(null);

	const conf = reactive<Conf>({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransitionMixin(conf, props.options);

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
		if ($wrapper.value === null) {
			return;
		}

		$wrapper.value.transform({
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
